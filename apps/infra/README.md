# Before deploying

1. Create a plain text secret in AWS Secrets Manager with the name "github-token" and the value of your GitHub personal access token with admin:repo_hook permissions.
2. Create .env from .env.example.
3. `cdk deploy --all`.
4. Go to the Amplify app on the AWS console and connect to the repo, this will install Amplify Github App. Then you have to click build manually to start Amplify deploy pipeline.

# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
