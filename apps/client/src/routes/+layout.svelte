<script lang="ts">
	import type { AppRouter } from '../../../server/src/router';
	import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
	import { onMount } from 'svelte';
	let dataFromTrpc = 'Loading...'
	const client = createTRPCProxyClient<AppRouter>({
		links: [
			httpBatchLink({
				url: 'http://localhost:2022/trpc'
			})
		]
	});
	onMount(async () => {
		const data = await client.api.hello.query();
		dataFromTrpc = JSON.stringify(data, null, 2);
	});
</script>

<slot />
<div>This is coming from TRPC: {dataFromTrpc}</div>
