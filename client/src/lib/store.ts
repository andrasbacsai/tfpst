// import { writable, readable, type Writable, type Readable } from 'svelte/store';
import superjson from 'superjson';
import type { AppRouter } from 'server/src/router';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { browser, dev } from '$app/environment';
export const serverBaseUrl = dev ? `http://${browser && window.location.hostname}:2022` : '';

export const t = createTRPCProxyClient<AppRouter>({
	transformer: superjson,
	links: [
		httpBatchLink({
			url: `${serverBaseUrl}/trpc`
		})
	]
});
