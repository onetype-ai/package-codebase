import commands from '@onetype/framework/commands';
import codebase from '#codebase/addon.js';

commands.Item({
	id: 'codebase:file',
	exposed: true,
	method: 'GET',
	endpoint: '/api/codebase/file',
	description: 'Answers with one whole file from the index, straight from the database. The companion of search: a hit names the file, this door hands over all of it.',
	metadata: { addon: 'codebase' },
	in: {
		source: {
			type: 'string',
			required: true,
			description: 'Slug of the source the file belongs to.'
		},
		path: {
			type: 'string',
			required: true,
			description: 'Path of the file relative to the source root.'
		}
	},
	out: 'codebase.file',
	callback: async function(properties, resolve)
	{
		const item = await codebase.files.Find()
			.filter('source', properties.source)
			.filter('path', properties.path)
			.filter('deleted_at', null, 'NULL')
			.one();

		if(!item)
		{
			return resolve(null, 'File ' + properties.source + '/' + properties.path + ' is not in the index.', 404);
		}

		resolve({
			source: item.Get('source'),
			path: item.Get('path'),
			hash: item.Get('hash'),
			size: item.Get('size'),
			content: item.Get('content')
		});
	}
});
