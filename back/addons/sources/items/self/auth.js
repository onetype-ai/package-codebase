import onetype from '@onetype/framework';

onetype.AddonReady('codebase.sources', (sources) =>
{
	sources.Item({
		id: 'auth',
		name: 'Auth',
		package: '@onetype/auth',
		description: 'Authentication for the platform. Local sessions over workspace users, login, tokens and the session cookie that fills http state.'
	});
});
