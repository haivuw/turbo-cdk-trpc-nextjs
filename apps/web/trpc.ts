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
          // TODO: this url is only for showing the example. It should be changed to '/api' or whatever the url you deploy with cdk
          url: '/api/trpc',
        }),
      ],
    };
  },
  ssr: false,
});
