import { inferAsyncReturnType } from '@trpc/server';
import {
  awsLambdaRequestHandler,
  CreateAWSLambdaContextOptions,
} from '@trpc/server/adapters/aws-lambda';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { appRouter } from 'api';

// TODO: move to packages/api
export interface Context {
  event: APIGatewayProxyEventV2;
}

export const appContext = ({
  event,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => {
  return {
    event,
  };
};

export type AppContext = inferAsyncReturnType<typeof appContext>;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
});
