import commands from '@onetype/framework/commands';

onetype.EmitOn('boot', () =>
{
	const interval = Number(process.env.CODEBASE_SCAN_INTERVAL ? process.env.CODEBASE_SCAN_INTERVAL : 0);

	if(!interval)
	{
		return;
	}

	const scan = async () =>
	{
		const result = await commands.Fn('run', 'codebase:scan', {});

		if(result.code !== 200)
		{
			onetype.Error(result.code, 'Codebase scan failed: :message:', { message: result.message });
		}
	};

	setTimeout(scan, 10000);
	setInterval(scan, interval * 1000);
});
