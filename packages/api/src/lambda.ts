import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { createContext } from './context';
import { appRouter } from './router';

export const trpcHandler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});
