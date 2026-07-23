onetype.emitters.ItemAdd({
    id: 'codebase.scan',
    description: 'A scan of the codebase finished and the index is fresh.',
    metadata: { addon: 'codebase' },
    config: {
        scan: {
            type: 'object',
            config: 'codebase.scan',
            description: 'What the scan did.'
        }
    }
});
