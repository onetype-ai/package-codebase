onetype.AddonReady('codebase.sources', (sources) =>
{
	sources.Item({
		id: 'work',
		name: 'Work',
		package: '@onetype/work',
		description: 'The work layer of the instance. Boards and tasks that humans and agents create, pick up and complete — one kanban, every worker, with comments and questions on every task.'
	});
});
