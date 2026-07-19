import codebase from '#codebase/addon.js';

codebase.sources.Fn('list', function()
{
	const sources = Object.values(this.Items()).map((item) => ({
		id: item.Get('id'),
		name: item.Get('name'),
		description: item.Get('description'),
		package: item.Get('package'),
		extensions: item.Get('extensions'),
		ignore: item.Get('ignore'),
		isInstalled: this.Fn('root', item.Get('id')) !== null
	}));

	return sources.sort((first, second) => first.name.localeCompare(second.name));
});
