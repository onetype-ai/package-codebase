import onetype from '@onetype/framework';

onetype.AddonReady('codebase.sources', (sources) =>
{
	sources.Item({
		id: 'forge',
		name: 'Forge',
		package: '@onetype/forge',
		description: 'The remote development workbench. A team of agents edits a package live on the developer machine while the real instance updates in an iframe — no local Node, no local Postgres.'
	});
});
