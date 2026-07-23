import { resolve } from 'path';
import { existsSync } from 'fs';
import codebase from '#codebase/addon.js';

codebase.sources.Fn('root', function(id)
{
    const item = this.ItemGet(id);

    if(!item)
    {
        return null;
    }

    const path = resolve(process.cwd(), 'node_modules', item.Get('package'));

    return existsSync(path) ? path : null;
});
