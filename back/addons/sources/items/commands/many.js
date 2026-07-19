import commands from '@onetype/framework/commands';
import codebase from '#codebase/addon.js';

commands.Item({
	id: 'codebase:sources:many',
	exposed: true,
	method: 'GET',
	endpoint: '/api/codebase/sources',
	description: 'Lists every registered source with what it covers and whether it resolves on this instance.',
	metadata: { addon: 'codebase.sources' },
	condition: function()
	{
		if(this.http && !this.http.state.user)
		{
			return 'Sign in to list the sources.';
		}
	},
	out: {
		sources: {
			type: 'array',
			required: true,
			each: 'codebase.source',
			description: 'Every registered source, sorted by name.'
		}
	},
	callback: function(properties, resolve)
	{
		resolve({ sources: codebase.sources.Fn('list') });
	}
});
