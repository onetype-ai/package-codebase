import database from '@onetype/framework/database';
import codebase from '#codebase/addon.js';

codebase.Fn('search', async function(query, source = null, path = null, limit = 10)
{
	const [vector] = await this.Fn('embed', [query]);
	const knex = database.Fn('connection');

	const conditions = ['chunks.deleted_at is null', 'files.deleted_at is null'];
	const bindings = [JSON.stringify(vector), '%' + query + '%', '%' + query + '%'];

	if(source)
	{
		conditions.push('files.source = ?');
		bindings.push(source);
	}

	if(path)
	{
		conditions.push('files.path ilike ?');
		bindings.push(path.includes('%') ? path : '%' + path + '%');
	}

	bindings.push(limit);

	const result = await knex.raw(
		'select files.source, files.path, chunks.position, chunks.line_start, chunks.line_end, chunks.content, chunks.context,'
		+ ' 1 - (chunks.embedding <=> ?::vector)'
		+ ' + (case when chunks.content ilike ? then 0.15 else 0 end)'
		+ ' + (case when files.path ilike ? then 0.1 else 0 end) as score'
		+ ' from codebase_chunks chunks'
		+ ' join codebase_files files on files.id = chunks.file_id'
		+ ' where ' + conditions.join(' and ')
		+ ' order by score desc'
		+ ' limit ?',
		bindings
	);

	return result.rows.map((row) => ({
		source: row.source,
		path: row.path,
		position: Number(row.position),
		line_start: Number(row.line_start),
		line_end: Number(row.line_end),
		content: row.content,
		context: row.context ? row.context : '',
		score: Math.round(row.score * 1000) / 1000
	}));
});
