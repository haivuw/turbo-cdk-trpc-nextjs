import * as cdk from 'aws-cdk-lib';
import { TestStack } from './test-stack';

const app = new cdk.App();
new TestStack(app, 'TestStack', {});

// bin.ts
import { Builder } from '@sls-next/lambda-at-edge';
import { NextjsStack } from './nextjs-stack';
import path from 'path';

const nextConfigPath = path.resolve('../../apps/web');
const outputDir = path.join(nextConfigPath, '.serverless_nextjs');

// Run the serverless builder, this could be done elsewhere in your workflow
const builder = new Builder(nextConfigPath, outputDir, {
  cmd: '../../node_modules/.bin/next',
  cwd: path.resolve('../../apps/web'),
  env: {},
  args: ['build'],
  minifyHandlers: true,
  // it is recommended to let your CF distribution do the compression as per the docs - https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html
  // however there have been issues in the past where CF doesn't compress lambda@edge responses, so we provide our own implementation in case is needed
  enableHTTPCompression: false,
});

builder
  .build()
  .then(() => {
    const app = new cdk.App();
    new NextjsStack(app, `MyStack`, {});
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
