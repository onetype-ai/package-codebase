onetype.AddonReady('codebase.sources', (sources) =>
{
	sources.Item({
		id: 'codebase',
		name: 'Codebase',
		package: '@onetype/codebase',
		description: 'This package: continuous code intelligence. Sources declare what gets scanned, the scan loop keeps embeddings fresh by content hash, and semantic search answers where things live.'
	});
});
