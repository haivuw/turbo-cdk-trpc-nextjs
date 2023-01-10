import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_lambda_nodejs, Duration } from 'aws-cdk-lib';

export class TestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new aws_lambda_nodejs.NodejsFunction(this, 'TRPCHandler', {
      entry: require.resolve('./api/server.ts'),
      timeout: Duration.minutes(1),
    });
  }
}
