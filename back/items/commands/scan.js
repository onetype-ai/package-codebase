import pipelines from 'addon-pipelines';
import commands from 'addon-commands';
import codebase from '#codebase/addon.js';

commands.Item({
    id: 'codebase:scan',
    exposed: true,
    method: 'POST',
    endpoint: '/api/codebase/scan',
    description: 'Walks the sources, notices what changed by content hash and refreshes the embeddings. One source when given, every source otherwise',
    metadata: { addon: 'codebase' },
    condition: function()
    {
        if(this.http && !this.http.state.user)
        {
            return 'Sign in to scan the codebase.';
        }
    },
    in: {
        source: {
            type: 'string',
            description: 'Slug of a single source to scan. Omitted scans every installed source.'
        }
    },
    out: 'codebase.scan',
    callback: async function(properties, resolve)
    {
        const result = await pipelines.run('codebase:scan', properties);

        if(result.code !== 200)
        {
            return resolve(null, result.message, result.code);
        }

        onetype.emitters.fire('codebase.scan', { scan: result.data });

        resolve(result.data, 'Scan finished: ' + result.data.added + ' added, ' + result.data.changed + ' changed, ' + result.data.removed + ' removed.');
    }
});
