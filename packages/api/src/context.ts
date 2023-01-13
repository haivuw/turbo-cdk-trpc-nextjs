import { type inferAsyncReturnType } from '@trpc/server';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda';

export const createContext = ({
  event,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => {
  return {
    event,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
