# Codebase

**Continuous code intelligence for the instance.** Scans the packages, embeds every chunk and answers semantic search over the whole codebase.

Codebase keeps a living index of the code the instance runs on. It walks the registered sources, notices what changed by content hash, embeds only the fresh chunks and drops the vanished ones — so the index is always current without ever reindexing the world. On top of that index sits one door: semantic search, for humans browsing and for agents asking where things live.

## What lives here

- **Sources** — what gets scanned: the registered package roots, declared in code or stored in the database.
- **Chunks** — the unit of the index: a slice of a file with its content hash and its embedding vector.
- **The doors** — scanning and searching are commands (`codebase:scan`, `codebase:search`), so the UI, HTTP, schedules and agents all use the same entrance.

## Status

Early. The structure is being laid down; sources, the scan loop and search are built step by step.
