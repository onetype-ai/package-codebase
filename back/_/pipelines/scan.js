import codebase from '#codebase/addon.js';

codebase.PipelineAdd({
	id: 'scan',
	description: 'Walks the sources, notices what changed by content hash and refreshes the embeddings.',
	timeout: 600000,
	in: {
		source: {
			type: 'string',
			description: 'Slug of a single source to scan. Omitted scans every installed source.'
		}
	},
	out: 'codebase.scan'
})

.Join('collect', {
	description: 'Resolve which sources the scan goes through.',
	out: {
		targets: {
			type: 'array',
			required: true,
			each: {
				type: 'string',
				description: 'Single source slug.'
			},
			description: 'Slugs of the sources to scan.'
		}
	},
	callback: ({ source }, resolve) =>
	{
		if(source)
		{
			if(!codebase.sources.ItemGet(source))
			{
				return resolve(null, 'Source ' + source + ' does not exist.', 404);
			}

			if(!codebase.sources.Fn('root', source))
			{
				return resolve(null, 'Source ' + source + ' is not installed on this instance.', 400);
			}

			return { targets: [source] };
		}

		const targets = codebase.sources.Fn('list')
			.filter((entry) => entry.isInstalled)
			.map((entry) => entry.id);

		return { targets };
	}
})

.Join('sync', {
	description: 'Sync every target source into the index.',
	requires: ['targets'],
	out: {
		sources: {
			type: 'number',
			required: true,
			description: 'How many sources the scan went through.'
		},
		added: {
			type: 'number',
			required: true,
			description: 'Files that entered the index for the first time.'
		},
		changed: {
			type: 'number',
			required: true,
			description: 'Files whose content hash changed and were re-embedded.'
		},
		removed: {
			type: 'number',
			required: true,
			description: 'Files that vanished from disk and left the index.'
		},
		chunks: {
			type: 'number',
			required: true,
			description: 'Chunks embedded during the scan.'
		}
	},
	callback: async function({ targets })
	{
		const totals = { sources: targets.length, added: 0, changed: 0, removed: 0, chunks: 0 };

		for(const target of targets)
		{
			const stats = await codebase.files.Fn('sync', target);

			totals.added += stats.added;
			totals.changed += stats.changed;
			totals.removed += stats.removed;
			totals.chunks += stats.chunks;

			this.log('Source ' + target + ': ' + stats.added + ' added, ' + stats.changed + ' changed, ' + stats.removed + ' removed, ' + stats.chunks + ' chunks.');
		}

		return totals;
	}
});
