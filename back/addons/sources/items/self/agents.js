onetype.AddonReady('codebase.sources', (sources) =>
{
	sources.Item({
		id: 'agents',
		name: 'Agents',
		package: '@onetype/agents',
		description: 'The agentic engine of the instance. Agents, tools, providers and runs — packages declare what their agents can do, consumers hand them research questions and tasks, every run is recorded step by step.'
	});
});
