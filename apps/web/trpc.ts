import { createTRPCNext } from '@trpc/next';
import { httpBatchLink, loggerLink } from '@trpc/client';
import type { AppRouter } from 'api';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: '/api',
        }),
      ],
    };
  },
  ssr: false,
});
