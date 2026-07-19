import codebase from '#codebase/addon.js';

const LINES = 120;
const CHARACTERS = 4000;

codebase.Fn('chunk.markdown', function(lines)
{
	const sections = [];
	const trail = [];

	let current = { start: 0, context: '', lines: [] };

	const close = () =>
	{
		if(current.lines.join('').trim())
		{
			sections.push(current);
		}
	};

	for(let index = 0; index < lines.length; index++)
	{
		const heading = lines[index].match(/^(#{1,6})\s+(.*)/);

		if(heading)
		{
			close();

			trail.length = heading[1].length - 1;
			trail[heading[1].length - 1] = heading[2].trim();

			current = { start: index, context: trail.filter(Boolean).join(' > '), lines: [] };
		}

		current.lines.push(lines[index]);
	}

	close();

	const chunks = [];

	for(const section of sections)
	{
		const size = section.lines.reduce((sum, line) => sum + line.length + 1, 0);
		const pieces = section.lines.length > LINES || size > CHARACTERS
			? this.Fn('chunk.code', section.lines, section.start, section.context)
			: [{
				position: 0,
				line_start: section.start + 1,
				line_end: section.start + section.lines.length,
				content: section.lines.join('\n'),
				context: section.context
			}];

		for(const piece of pieces)
		{
			chunks.push({ ...piece, position: chunks.length });
		}
	}

	return chunks;
});
