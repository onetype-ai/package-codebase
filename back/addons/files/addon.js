onetype.AddonReady('codebase', (codebase) =>
{
	codebase.files = onetype.Addon('codebase.files', (addon) =>
	{
		addon.Table('codebase_files');

		addon.Field('id', {
			type: 'string',
			description: 'Unique file identifier.'
		});

		addon.Field('source', {
			type: 'string',
			required: true,
			description: 'Slug of the source the file belongs to, like framework or work.'
		});

		addon.Field('path', {
			type: 'string',
			required: true,
			description: 'Path of the file relative to the source root.'
		});

		addon.Field('hash', {
			type: 'string',
			required: true,
			description: 'Content hash from the last scan, the key that decides whether the file changed.'
		});

		addon.Field('content', {
			type: 'string',
			description: 'The whole content of the file, exactly as it stands on disk at the last scan.'
		});

		addon.Field('size', {
			type: 'number',
			value: 0,
			description: 'File size in bytes at the last scan.'
		});

		addon.Field('updated_at', {
			type: 'string',
			description: 'Timestamp of the last change.'
		});

		addon.Field('created_at', {
			type: 'string',
			description: 'Timestamp of when the file entered the index.'
		});

		addon.Field('deleted_at', {
			type: 'string',
			description: 'Soft delete timestamp, null while active.'
		});

		addon.Schema('id bigserial primary key');
		addon.Schema('source varchar(255) not null');
		addon.Schema('path varchar(1024) not null');
		addon.Schema('hash varchar(64) not null');
		addon.Schema('content text');
		addon.Schema('size bigint not null default 0');
		addon.Schema('updated_at timestamptz');
		addon.Schema('created_at timestamptz not null default now()');
		addon.Schema('deleted_at timestamptz');
		addon.Schema('unique (source, path)');
		addon.Schema('index (source)');
	});
});
