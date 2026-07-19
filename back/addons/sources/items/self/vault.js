import onetype from '@onetype/framework';

onetype.AddonReady('codebase.sources', (sources) =>
{
	sources.Item({
		id: 'vault',
		name: 'Vault',
		package: '@onetype/vault',
		description: 'Encrypted secrets for the instance. Packages declare the keys they need, admins fill them in through the UI, and packages read them back only on the back where they are used.'
	});
});
