import commands from '@onetype/framework/commands';
import codebase from '#codebase/addon.js';

commands.Item({
	id: 'codebase:search',
	exposed: true,
	method: 'POST',
	endpoint: '/api/codebase/search',
	description: 'Semantic search over the whole codebase. Embeds the query and answers with the closest chunks, each carrying its source, path, lines and content.',
	metadata: { addon: 'codebase' },
	in: {
		query: {
			type: 'string',
			required: true,
			description: 'What to look for, in natural language or code.'
		},
		source: {
			type: 'string',
			description: 'Slug of a single source to search in. Omitted searches everything.'
		},
		path: {
			type: 'string',
			description: 'Path pattern the file must match, like front/ or %.css. Plain text matches anywhere in the path.'
		},
		limit: {
			type: 'number',
			value: 10,
			description: 'How many results to answer with, capped at fifty.'
		}
	},
	out: {
		results: {
			type: 'array',
			required: true,
			each: 'codebase.result',
			description: 'The closest chunks, best match first.'
		}
	},
	callback: async function(properties, resolve)
	{
		if(properties.source && !codebase.sources.ItemGet(properties.source))
		{
			return resolve(null, 'Source ' + properties.source + ' does not exist.', 404);
		}

		const limit = Math.min(Math.max(properties.limit, 1), 50);
		const results = await codebase.Fn('search', properties.query, properties.source, properties.path, limit);

		resolve({ results }, 'Found ' + results.length + (results.length === 1 ? ' place.' : ' places.'));
	}
});
