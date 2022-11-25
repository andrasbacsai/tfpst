import { z } from 'zod';
import { publicProcedure, router } from '~/router/trpc';
import { prisma } from '~/prisma';

export const apiRouter = router({
  version: publicProcedure.query(() => {
    return { version: '0.42.0' };
  }),
  hello: publicProcedure
    .input(z.object({ username: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
      return {
        text: `hello ${input?.username ?? ctx.user?.name ?? 'world'}`,
      };
    }),
  db: publicProcedure
    .query(async () => {
      const userCount = await prisma.user.count();
      return {
        userCount,
      };
    }),
});
