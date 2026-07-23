onetype.schemas.ItemAdd({
    id: 'codebase.source',
    config: {
        id: {
            type: 'string',
            description: 'Source slug everything references, like framework or work.'
        },
        name: {
            type: 'string',
            description: 'Human readable name of the source.'
        },
        description: {
            type: 'string',
            description: 'One line about what code lives in this source.'
        },
        package: {
            type: 'string',
            description: 'Npm package name the source is resolved from.'
        },
        extensions: {
            type: 'array',
            value: [],
            each: {
                type: 'string',
                description: 'Single file extension including the dot.'
            },
            description: 'File extensions the scan picks up inside this source.'
        },
        ignore: {
            type: 'array',
            value: [],
            each: {
                type: 'string',
                description: 'Single folder or file name skipped anywhere in the tree.'
            },
            description: 'Folder and file names the scan skips anywhere in the tree.'
        },
        isInstalled: {
            type: 'boolean',
            value: false,
            description: 'Whether the package resolves on this instance.'
        }
    }
});
