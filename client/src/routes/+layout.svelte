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
		const trpcData = await client.api.hello.query();
		const prismaData = await client.api.db.query();
		const apiData = await (await fetch(`${serverBaseUrl}/api`)).json();

		dataFromTrpc = JSON.stringify(trpcData, null, 2) + '✅';
		dataFromApi = JSON.stringify(apiData, null, 2) + '✅';
		dataFromPrisma = JSON.stringify(prismaData, null, 2) + '✅';
	});
</script>

<slot />
<div>Tailwind ✅</div>
<div>This is coming from TRPC: {dataFromTrpc}</div>
<div>This is coming from API: {dataFromApi}</div>
<div>This is coming from DB (Prisma): {dataFromPrisma}</div>
