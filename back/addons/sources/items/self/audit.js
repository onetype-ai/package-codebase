onetype.AddonReady('codebase.sources', (sources) =>
{
    sources.Item({
        id: 'audit',
        name: 'Audit',
        package: '@onetype/audit',
        description: 'The audit trail of the instance. Every command run lands in the log with who ran it, from where and how it went.'
    });
});
