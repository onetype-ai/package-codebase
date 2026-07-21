onetype.AddonReady('codebase.sources', (sources) =>
{
	sources.Item({
		id: 'connect',
		name: 'Connect',
		package: '@onetype/connect',
		description: 'External providers as first class citizens. Packages declare providers like Slack, GitHub and Google with typed actions, admins connect accounts through OAuth or an API key, and anything on the platform runs those actions with a live token.'
	});
});
