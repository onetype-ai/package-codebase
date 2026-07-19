import { readFileSync } from 'fs';
import { join } from 'path';
import codebase from '#codebase/addon.js';

codebase.files.Fn('sync', async function(source)
{
	const root = codebase.sources.Fn('root', source);
	const stats = { added: 0, changed: 0, removed: 0, chunks: 0 };

	if(!root)
	{
		return stats;
	}

	const walked = codebase.sources.Fn('walk', source);

	const rows = await this.Find()
		.filter('source', source)
		.filter('deleted_at', null, 'NULL')
		.limit(100000)
		.many();

	const known = new Map(rows.map((row) => [row.Get('path'), row]));

	for(const file of walked)
	{
		const row = known.get(file.path);

		known.delete(file.path);

		if(row && row.Get('hash') === file.hash)
		{
			if(!row.Get('content'))
			{
				row.Set('content', readFileSync(join(root, file.path), 'utf8'));

				await row.Update({ whitelist: ['content'] });
			}

			continue;
		}

		const content = readFileSync(join(root, file.path), 'utf8');
		const chunks = codebase.Fn('chunk', content);
		const vectors = await codebase.Fn('embed', chunks.map((chunk) => chunk.content));

		let item = row;

		if(row)
		{
			row.Set('hash', file.hash);
			row.Set('size', file.size);
			row.Set('content', content);

			await row.Update({ whitelist: ['hash', 'size', 'content'] });

			const previous = await codebase.chunks.Find()
				.filter('file_id', row.Get('id'))
				.limit(100000)
				.many();

			for(const chunk of previous)
			{
				await chunk.Delete();
			}

			stats.changed++;
		}
		else
		{
			item = this.Item({
				source: source,
				path: file.path,
				hash: file.hash,
				size: file.size,
				content: content
			});

			await item.Create();

			stats.added++;
		}

		for(let index = 0; index < chunks.length; index++)
		{
			const chunk = codebase.chunks.Item({
				file_id: item.Get('id'),
				position: chunks[index].position,
				line_start: chunks[index].line_start,
				line_end: chunks[index].line_end,
				content: chunks[index].content,
				embedding: vectors[index]
			});

			await chunk.Create();

			stats.chunks++;
		}
	}

	for(const row of known.values())
	{
		await row.Delete();

		stats.removed++;
	}

	return stats;
});
