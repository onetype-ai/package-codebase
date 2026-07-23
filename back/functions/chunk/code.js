import codebase from '#codebase/addon.js';

const LINES = 120;
const CHARACTERS = 4000;
const OVERLAP = 0.2;

codebase.Fn('chunk.code', function(lines, offset = 0, context = '')
{
    const windows = [];

    let start = 0;
    let count = 0;
    let size = 0;

    const flush = (end) =>
    {
        if(count)
        {
            windows.push({ start, end });
        }

        count = 0;
        size = 0;
    };

    for(let index = 0; index < lines.length; index++)
    {
        const length = Math.min(lines[index].length, CHARACTERS);

        if(count && (count >= LINES || size + length > CHARACTERS))
        {
            flush(index);
        }

        if(!count)
        {
            start = index;
        }

        count++;
        size += length + 1;
    }

    flush(lines.length);

    const chunks = [];

    for(const window of windows)
    {
        const reach = Math.round((window.end - window.start) * OVERLAP);
        const first = windows.length > 1 ? Math.max(0, window.start - reach) : window.start;
        const last = windows.length > 1 ? Math.min(lines.length, window.end + reach) : window.end;

        const text = lines
            .slice(first, last)
            .map((line) => line.length > CHARACTERS ? line.slice(0, CHARACTERS) : line)
            .join('\n');

        if(text.trim())
        {
            chunks.push({
                position: chunks.length,
                line_start: offset + first + 1,
                line_end: offset + last,
                content: text,
                context: context
            });
        }
    }

    return chunks;
});
