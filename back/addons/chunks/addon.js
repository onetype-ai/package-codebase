onetype.AddonReady('codebase', (codebase) =>
{
	codebase.chunks = onetype.Addon('codebase.chunks', (addon) =>
	{
		addon.Table('codebase_chunks');

		addon.Field('id', {
			type: 'string',
			description: 'Unique chunk identifier.'
		});

		addon.Field('file_id', {
			type: 'string',
			required: true,
			description: 'Id of the file the chunk was cut from.'
		});

		addon.Field('position', {
			type: 'number',
			value: 0,
			description: 'Order of the chunk inside the file, first chunk is zero.'
		});

		addon.Field('line_start', {
			type: 'number',
			value: 1,
			description: 'First line of the file the chunk covers.'
		});

		addon.Field('line_end', {
			type: 'number',
			value: 1,
			description: 'Last line of the file the chunk covers.'
		});

		addon.Field('content', {
			type: 'string',
			required: true,
			description: 'The actual content of the chunk, exactly as it stands in the file.'
		});

		addon.Field('context', {
			type: 'string',
			description: 'Where the chunk sits inside the document, like a heading trail in markdown. Empty for plain code.'
		});

		addon.Field('embedding', {
			type: 'array',
			value: [],
			each: {
				type: 'number',
				description: 'Single dimension of the vector.'
			},
			description: 'Embedding vector of the text, 1024 dimensions.'
		});

		addon.Field('updated_at', {
			type: 'string',
			description: 'Timestamp of the last change.'
		});

		addon.Field('created_at', {
			type: 'string',
			description: 'Timestamp of when the chunk was embedded.'
		});

		addon.Field('deleted_at', {
			type: 'string',
			description: 'Soft delete timestamp, null while active.'
		});

		addon.Schema('id bigserial primary key');
		addon.Schema('file_id bigint not null references codebase_files(id) on delete cascade');
		addon.Schema('position bigint not null default 0');
		addon.Schema('line_start bigint not null default 1');
		addon.Schema('line_end bigint not null default 1');
		addon.Schema('content text not null');
		addon.Schema('context varchar(1024)');
		addon.Schema('embedding vector(1024)');
		addon.Schema('updated_at timestamptz');
		addon.Schema('created_at timestamptz not null default now()');
		addon.Schema('deleted_at timestamptz');
		addon.Schema('index (file_id)');
	});
});
