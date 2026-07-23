import codebase from '#codebase/addon.js';

const BATCH = 32;

codebase.Fn('embed', async function(texts)
{
    if(!texts.length)
    {
        return [];
    }

    const endpoint = process.env.CODEBASE_EMBEDDINGS_ENDPOINT;
    const model = process.env.CODEBASE_EMBEDDINGS_MODEL;

    if(!endpoint || !model)
    {
        throw onetype.Error(500, 'Codebase embeddings are not configured, set CODEBASE_EMBEDDINGS_ENDPOINT and CODEBASE_EMBEDDINGS_MODEL.');
    }

    const vectors = [];

    for(let offset = 0; offset < texts.length; offset += BATCH)
    {
        const response = await onetype.HelperRetry(() => fetch(endpoint + '/v1/embeddings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(120000),
            body: JSON.stringify({
                model: model,
                input: texts.slice(offset, offset + BATCH),
                truncate_prompt_tokens: 2048
            })
        }), 3, 2000);

        if(!response.ok)
        {
            throw onetype.Error(502, 'Embeddings server answered with status :status:.', { status: response.status });
        }

        const data = await response.json();

        for(const entry of data.data.sort((first, second) => first.index - second.index))
        {
            vectors.push(entry.embedding);
        }
    }

    return vectors;
});
