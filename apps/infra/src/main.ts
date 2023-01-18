import * as cdk from 'aws-cdk-lib';
import { AmplifyHostingStack } from './amplify-hosting-stack';
import { ApiStack } from './api-stack';
import { GITHUB_TOKEN_SECRET_NAME } from './constant';

const { GITHUB_OWNER, GITHUB_REPO } = process.env;

if (!GITHUB_OWNER || !GITHUB_REPO) {
  throw new Error('GITHUB_OWNER and GITHUB_REPO must be set');
}

const app = new cdk.App();

const api = new ApiStack(app, 'TestStack', {});

new AmplifyHostingStack(app, 'ProductHostingStack', {
  // Name given to plaintext secret in secretsManager.
  // When creating the token scope on Github, only the admin:repo_hook scope is needed
  githubOauthTokenName: GITHUB_TOKEN_SECRET_NAME,
  // swap for your github username
  owner: GITHUB_OWNER,
  // swap for your github frontend repo
  repository: GITHUB_REPO,
  //pass in any envVars from the above stacks here
  environmentVariables: {
    TRPC_URL: api.trpcUrl,
  },
});
