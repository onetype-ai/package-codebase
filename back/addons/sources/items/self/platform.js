onetype.AddonReady('codebase.sources', (sources) =>
{
	sources.Item({
		id: 'platform',
		name: 'Platform',
		package: '@onetype/platform',
		description: 'The open source workspace platform on top of the framework. The admin runtime with apps, screens and layouts, the whole element library, the universal database underneath and the package system that loads everything else.'
	});
});
