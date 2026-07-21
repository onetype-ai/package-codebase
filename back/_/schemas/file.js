onetype.SchemasRegister('codebase.file', {
	source: {
		type: 'string',
		description: 'Slug of the source the file belongs to.'
	},
	path: {
		type: 'string',
		description: 'Path of the file relative to the source root.'
	},
	hash: {
		type: 'string',
		description: 'Content hash from the last scan.'
	},
	size: {
		type: 'number',
		description: 'File size in bytes at the last scan.'
	},
	content: {
		type: 'string',
		description: 'The whole content of the file as it stood at the last scan.'
	}
});
