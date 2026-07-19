import codebase from '#codebase/addon.js';

const LINES = 120;
const CHARACTERS = 4000;

codebase.Fn('chunk', function(content)
{
	if(!content.trim())
	{
		return [];
	}

	const lines = content.split('\n');
	const chunks = [];

	let start = 0;
	let buffer = [];
	let size = 0;

	const flush = (end) =>
	{
		if(buffer.join('').trim())
		{
			chunks.push({
				position: chunks.length,
				line_start: start + 1,
				line_end: end,
				text: buffer.join('\n')
			});
		}

		buffer = [];
		size = 0;
	};

	for(let index = 0; index < lines.length; index++)
	{
		const line = lines[index].length > CHARACTERS ? lines[index].slice(0, CHARACTERS) : lines[index];

		if(buffer.length && (buffer.length >= LINES || size + line.length > CHARACTERS))
		{
			flush(index);
		}

		if(!buffer.length)
		{
			start = index;
		}

		buffer.push(line);
		size += line.length + 1;
	}

	flush(lines.length);

	return chunks;
});
