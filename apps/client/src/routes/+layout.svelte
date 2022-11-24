<script lang="ts">
	import type { AppRouter } from '../../../server/router';
	import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
	import { onMount } from 'svelte';
	const client = createTRPCProxyClient<AppRouter>({
		links: [
			httpBatchLink({
				url: 'http://localhost:2022/trpc'
			})
		]
	});
	onMount(async () => {
		const a = await client.api.hello.query();
		console.log(a);
	});
</script>

<slot />
