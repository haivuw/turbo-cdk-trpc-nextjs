import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_lambda_nodejs, CfnOutput, Duration } from 'aws-cdk-lib';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';

export class TestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const trpc = new aws_lambda_nodejs.NodejsFunction(this, 'TRPCHandler', {
      entry: require.resolve('./trpc'),
      timeout: Duration.minutes(1),
    });

    const url = trpc.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, 'TRPCUrl', {
      value: url.url,
    });
  }
}
