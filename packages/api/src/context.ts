import { type inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';

export const createContext = async (options: CreateNextContextOptions) => {
  if (options.req.headers.cookie) {
    // auth or something...
  }

  return { user: null };
};

export type Context = inferAsyncReturnType<typeof createContext>;
