import codebase from '#codebase/addon.js';

codebase.Fn('chunk', function(content, extension = '')
{
    if(!content.trim())
    {
        return [];
    }

    const lines = content.split('\n');

    return extension === '.md' ? this.Fn('chunk.markdown', lines) : this.Fn('chunk.code', lines);
});
