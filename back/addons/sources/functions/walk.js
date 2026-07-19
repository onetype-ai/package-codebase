import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';
import codebase from '#codebase/addon.js';

codebase.sources.Fn('walk', function(id)
{
	const root = this.Fn('root', id);

	if(!root)
	{
		return [];
	}

	const item = this.ItemGet(id);
	const extensions = item.Get('extensions');
	const ignore = item.Get('ignore');
	const files = [];

	const enter = (folder) =>
	{
		for(const entry of readdirSync(folder, { withFileTypes: true }))
		{
			if(entry.name.startsWith('.') || ignore.includes(entry.name))
			{
				continue;
			}

			const path = join(folder, entry.name);

			if(entry.isDirectory())
			{
				enter(path);
			}
			else if(entry.isFile() && extensions.some((extension) => entry.name.endsWith(extension)))
			{
				const content = readFileSync(path);

				files.push({
					path: path.slice(root.length + 1),
					size: content.length,
					hash: createHash('sha1').update(content).digest('hex')
				});
			}
		}
	};

	enter(root);

	return files;
});
