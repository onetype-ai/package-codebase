import onetype from '@onetype/framework';

onetype.AddonReady('codebase', (codebase) =>
{
	codebase.sources = onetype.Addon('codebase.sources', (addon) =>
	{
		addon.Field('id', {
			type: 'string',
			description: 'Source slug everything references, like framework or work.'
		});

		addon.Field('name', {
			type: 'string',
			required: true,
			description: 'Human readable name of the source.'
		});

		addon.Field('description', {
			type: 'string',
			description: 'One line about what code lives in this source.'
		});

		addon.Field('package', {
			type: 'string',
			required: true,
			description: 'Npm package name the source is resolved from, like @onetype/work.'
		});

		addon.Field('extensions', {
			type: 'array',
			value: ['.js', '.css', '.json'],
			each: {
				type: 'string',
				description: 'Single file extension including the dot.'
			},
			description: 'File extensions the scan picks up inside this source.'
		});

		addon.Field('ignore', {
			type: 'array',
			value: ['node_modules', 'package-lock.json'],
			each: {
				type: 'string',
				description: 'Single folder or file name skipped anywhere in the tree.'
			},
			description: 'Folder and file names the scan skips anywhere in the tree, on top of everything hidden.'
		});
	});
});
