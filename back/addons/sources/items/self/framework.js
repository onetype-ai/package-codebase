import onetype from '@onetype/framework';

onetype.AddonReady('codebase.sources', (sources) =>
{
	sources.Item({
		id: 'framework',
		name: 'Framework',
		package: '@onetype/framework',
		description: 'The full-stack isomorphic framework everything runs on. One addon abstraction powers databases, servers, commands, pages, directives and queues — items, Find, schemas, pipelines, emitters and the render engine all live here.'
	});
});
