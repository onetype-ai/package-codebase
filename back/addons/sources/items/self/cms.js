onetype.AddonReady('codebase.sources', (sources) =>
{
	sources.Item({
		id: 'cms',
		name: 'CMS',
		package: '@onetype/cms',
		description: 'Content management on top of the universal database. Define collections, manage entries and publish content any package can consume.'
	});
});
