import { apiRouter } from '~/router/routers/api';
import { postsRouter } from '~/router/routers/posts';
import { router } from '~/router/trpc';

export const appRouter = router({
  posts: postsRouter,
  api: apiRouter,
});

export type AppRouter = typeof appRouter;
