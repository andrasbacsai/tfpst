<script lang="ts">
	import '../app.postcss';
	import type { AppRouter } from 'server/src/router';
	import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';

	let serverBaseUrl = dev ? 'http://localhost:2022' : '';

	let dataFromTrpc = 'Loading...';
	let dataFromApi = 'Loading...';
	let dataFromPrisma = 'Loading...';

	const client = createTRPCProxyClient<AppRouter>({
		links: [
			httpBatchLink({
				url: `${serverBaseUrl}/trpc`
			})
		]
	});

	onMount(async () => {
		const [trpcData, apiData, prismaData] = await Promise.all([
			client.api.hello.query(),
			fetch(`${serverBaseUrl}/api`),
			client.api.db.query()
		]);
		dataFromTrpc = JSON.stringify(trpcData, null, 2) + '✅';
		dataFromApi = JSON.stringify(await apiData.json(), null, 2) + '✅';
		dataFromPrisma = JSON.stringify(prismaData, null, 2) + '✅';
	});
</script>

<slot />
<div>Tailwind ✅</div>
<div>Prisma ✅</div>
<div>This is coming from TRPC: {dataFromTrpc}</div>
<div>This is coming from API: {dataFromApi}</div>
<div>This is coming from DB (Prisma): {dataFromPrisma}</div>
