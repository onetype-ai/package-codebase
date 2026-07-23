onetype.AddonReady('codebase.sources', (sources) =>
{
    sources.Item({
        id: 'cookbook',
        name: 'Cookbook',
        package: '@onetype/cookbook',
        extensions: ['.md'],
        description: 'The house rules of the whole ecosystem, in prose. How code is written here: formatting, naming, structure, commands, schemas, elements, design, testing — the why behind every convention the packages follow.'
    });
});
