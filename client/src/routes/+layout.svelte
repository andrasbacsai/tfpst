<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { serverBaseUrl, t } from '$lib/store';

	let dataFromTrpc = 'Loading...';
	let dataFromApi = 'Loading...';
	let dataFromPrisma = 'Loading...';

	onMount(async () => {
		const [trpcData, apiData, prismaData] = await Promise.all([
			t.api.hello.query(),
			fetch(`${serverBaseUrl}/api`),
			t.api.db.query()
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
