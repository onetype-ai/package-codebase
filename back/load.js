import codebase from '#codebase/addon.js';

/* Addons */
import '#codebase/addons/sources/load.js';
import '#codebase/addons/files/load.js';
import '#codebase/addons/chunks/load.js';

/* Core */
import '#codebase/core/schemas/scan.js';
import '#codebase/core/schemas/result.js';
import '#codebase/core/emitters/scan.js';
import '#codebase/core/pipelines/scan.js';

/* Functions */
import '#codebase/functions/chunk.js';
import '#codebase/functions/embed.js';
import '#codebase/functions/search.js';

/* Items */
import '#codebase/items/commands/scan.js';
import '#codebase/items/commands/search.js';

/* Listeners */
import '#codebase/listeners/boot.js';

export default codebase;
