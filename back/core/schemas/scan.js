onetype.SchemasRegister('codebase.scan', {
	sources: {
		type: 'number',
		value: 0,
		description: 'How many sources the scan went through.'
	},
	added: {
		type: 'number',
		value: 0,
		description: 'Files that entered the index for the first time.'
	},
	changed: {
		type: 'number',
		value: 0,
		description: 'Files whose content hash changed and were re-embedded.'
	},
	removed: {
		type: 'number',
		value: 0,
		description: 'Files that vanished from disk and left the index.'
	},
	chunks: {
		type: 'number',
		value: 0,
		description: 'Chunks embedded during the scan.'
	}
});
