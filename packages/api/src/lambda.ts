import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { appRouter } from 'api';

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});
