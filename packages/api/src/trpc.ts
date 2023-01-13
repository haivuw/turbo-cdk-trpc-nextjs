import { initTRPC } from '@trpc/server';
import { type Context } from './context';

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthed = t.middleware(({ ctx, next }) => {
  // if (!ctx.user) {
  //   throw new TRPCError({
  //     code: 'UNAUTHORIZED',
  //     message: 'Not authenticated',
  //   });
  // }

  return next({
    ctx,
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
