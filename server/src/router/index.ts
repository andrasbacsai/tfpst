import { apiRouter } from './routers/api';
import { postsRouter } from './routers/posts';
import { router } from './trpc';

export const appRouter = router({
  posts: postsRouter,
  api: apiRouter,
});

export type AppRouter = typeof appRouter;
