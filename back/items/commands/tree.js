import commands from '@onetype/framework/commands';
import codebase from '#codebase/addon.js';

commands.Item({
	id: 'codebase:tree',
	exposed: true,
	method: 'GET',
	endpoint: '/api/codebase/tree',
	description: 'Lists every indexed file of one source with its path and size. The map of a package: search finds the needle, this door shows the haystack.',
	metadata: { addon: 'codebase' },
	in: {
		source: {
			type: 'string',
			required: true,
			description: 'Slug of the source to list.'
		}
	},
	out: {
		source: {
			type: 'string',
			required: true,
			description: 'Slug of the listed source.'
		},
		files: {
			type: 'array',
			required: true,
			each: {
				type: 'object',
				description: 'A single indexed file.',
				config: {
					path: {
						type: 'string',
						description: 'Path of the file relative to the source root.'
					},
					size: {
						type: 'number',
						description: 'File size in bytes at the last scan.'
					}
				}
			},
			description: 'Every indexed file of the source, sorted by path.'
		}
	},
	callback: async function(properties, resolve)
	{
		if(!codebase.sources.ItemGet(properties.source))
		{
			return resolve(null, 'Source ' + properties.source + ' does not exist.', 404);
		}

		const result = await codebase.files.Find()
			.filter('source', properties.source)
			.filter('deleted_at', null, 'NULL')
			.select(['path', 'size'])
			.sort('path', 'ASC')
			.limit(100000)
			.plain();

		resolve({
			source: properties.source,
			files: result.items.map((item) => ({ path: item.path, size: Number(item.size) }))
		});
	}
});
