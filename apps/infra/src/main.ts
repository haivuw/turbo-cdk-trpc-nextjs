import * as cdk from 'aws-cdk-lib';
import { TestStack } from './test-stack';

const app = new cdk.App();
new TestStack(app, 'TestStack', {});
