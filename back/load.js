import codebase from '#codebase/addon.js';
import '#codebase/items/onetype-schemas/codebase.scan.js';
import '#codebase/items/onetype-schemas/codebase.result.js';
import '#codebase/items/onetype-schemas/codebase.file.js';

import '#codebase/addons/sources/load.js';
import '#codebase/addons/files/load.js';
import '#codebase/addons/chunks/load.js';

import '#codebase/items/pipelines/scan.js';

import '#codebase/functions/chunk.js';
import '#codebase/functions/chunk/code.js';
import '#codebase/functions/chunk/markdown.js';
import '#codebase/functions/embed.js';
import '#codebase/functions/search.js';

import '#codebase/items/commands/scan.js';
import '#codebase/items/commands/search.js';
import '#codebase/items/commands/file.js';
import '#codebase/items/commands/tree.js';
import '#codebase/items/onetype-emitters/codebase.scan.js';

import '#codebase/listeners/emitters/boot.js';

export default codebase;
