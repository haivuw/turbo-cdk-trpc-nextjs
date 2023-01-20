import { NextJSLambdaEdge } from '@sls-next/cdk-construct';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class NextjsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);
    new NextJSLambdaEdge(this, 'NextJsApp', {
      serverlessBuildOutDir: './build',
    });
  }
}
