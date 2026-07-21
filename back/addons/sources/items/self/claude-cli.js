onetype.AddonReady('codebase.sources', (sources) =>
{
	sources.Item({
		id: 'claude-cli',
		name: 'Claude CLI',
		package: '@onetype/claude-cli',
		description: 'Claude Code over the subscription as a model provider. A gRPC door to a small agent on the developer machine that spawns claude -p and streams the answer back, no API key needed.'
	});
});
