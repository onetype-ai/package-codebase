import onetype from '@onetype/framework';

onetype.DataSchema('codebase.result', {
	source: {
		type: 'string',
		description: 'Slug of the source the hit comes from.'
	},
	path: {
		type: 'string',
		description: 'Path of the file relative to the source root.'
	},
	position: {
		type: 'number',
		description: 'Order of the chunk inside the file, first chunk is zero.'
	},
	line_start: {
		type: 'number',
		description: 'First line of the file the chunk covers.'
	},
	line_end: {
		type: 'number',
		description: 'Last line of the file the chunk covers.'
	},
	content: {
		type: 'string',
		description: 'The actual content of the chunk.'
	},
	context: {
		type: 'string',
		description: 'Where the chunk sits inside the document, like a heading trail in markdown. Empty for plain code.'
	},
	score: {
		type: 'number',
		description: 'Cosine similarity between the query and the chunk, one is a perfect match.'
	}
});
