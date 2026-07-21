import codebase from '#codebase/addon.js';

/* Addons */
import '#codebase/addons/sources/load.js';
import '#codebase/addons/files/load.js';
import '#codebase/addons/chunks/load.js';

/* Core */
import '#codebase/_/schemas/scan.js';
import '#codebase/_/schemas/result.js';
import '#codebase/_/schemas/file.js';
import '#codebase/_/emitters/scan.js';
import '#codebase/_/pipelines/scan.js';

/* Functions */
import '#codebase/functions/chunk.js';
import '#codebase/functions/chunk/code.js';
import '#codebase/functions/chunk/markdown.js';
import '#codebase/functions/embed.js';
import '#codebase/functions/search.js';

/* Items */
import '#codebase/items/commands/scan.js';
import '#codebase/items/commands/search.js';
import '#codebase/items/commands/file.js';
import '#codebase/items/commands/tree.js';

/* Listeners */
import '#codebase/listeners/boot.js';

export default codebase;
