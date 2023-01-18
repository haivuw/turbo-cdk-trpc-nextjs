import { CfnOutput, SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import { App, GitHubSourceCodeProvider } from '@aws-cdk/aws-amplify-alpha';
import { CfnApp } from 'aws-cdk-lib/aws-amplify';

interface HostingStackProps extends StackProps {
  readonly owner: string;
  readonly repository: string;
  readonly githubOauthTokenName: string;
  readonly environmentVariables?: { [name: string]: string };
}

export class AmplifyHostingStack extends Stack {
  constructor(scope: Construct, id: string, props: HostingStackProps) {
    super(scope, id, props);

    const amplifyApp = new App(this, 'Sample', {
      appName: 'NextJs Sample',
      sourceCodeProvider: new GitHubSourceCodeProvider({
        owner: props.owner,
        repository: props.repository,
        oauthToken: SecretValue.secretsManager(props.githubOauthTokenName),
      }),
      autoBranchDeletion: true,
      // customRules: [
      //   {
      //     source: '/<*>',
      //     target: '	/index.html',
      //     status: RedirectStatus.NOT_FOUND_REWRITE,
      //   },
      // ],
      // needed for monorepo structure
      environmentVariables: {
        AMPLIFY_MONOREPO_APP_ROOT: 'apps/web',
        AMPLIFY_DIFF_DEPLOY: 'false',
        ...props.environmentVariables,
      },
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        // needed for monorepo structure
        // https://docs.aws.amazon.com/amplify/latest/userguide/monorepo-configuration.html
        applications: [
          {
            appRoot: 'apps/web',
            frontend: {
              phases: {
                preBuild: {
                  commands: [
                    'cd ../../',
                    'npm ci',
                    'cp -r node_modules apps/web/node_modules',
                    'cp -r packages/api apps/web/node_modules/api',
                    'cp -r packages/ui apps/web/node_modules/ui',
                    'cp -r packages/tsconfig apps/web/node_modules/tsconfig',
                  ],
                },
                build: {
                  commands: ['npm run build -w apps/web'],
                },
              },
              artifacts: {
                baseDirectory: '.next',
                files: ['**/*'],
              },
              cache: {
                paths: ['node_modules/**/*'],
              },
            },
          },
        ],
      }),
    });

    const main = amplifyApp.addBranch('main', {
      stage: 'PRODUCTION',
      autoBuild: true,
    });

    //Drop down to L1 to allow new NextJS architecture
    const cfnAmplifyApp = amplifyApp.node.defaultChild as CfnApp;
    cfnAmplifyApp.platform = 'WEB_COMPUTE';

    // // add framework manually because it is not yet supported by the Amplify CDK
    // // https://github.com/aws/aws-cdk/issues/23325
    // const cfnBranch = main.node.defaultChild as CfnBranch;
    // cfnBranch.addOverride('Properties.Framework', 'Next.js - SSR');
    // // cfnBranch.addDeletionOverride('Properties.BranchName');

    // // update platform to WEB_COMPUTE because it is not yet supported by the Amplify CDK
    // // https://aws.amazon.com/de/blogs/mobile/deploy-a-nextjs-13-application-to-amplify-with-the-aws-cdk/
    // const updatePlatform = new cr.AwsCustomResource(this, 'updatePlatform', {
    //   policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
    //     resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
    //   }),
    //   onCreate: {
    //     service: 'Amplify',
    //     action: 'updateApp',
    //     physicalResourceId: cr.PhysicalResourceId.of('app-update-platform'),
    //     parameters: {
    //       appId: amplifyApp.appId,
    //       platform: 'WEB_COMPUTE',
    //     },
    //   },
    // });
    // console.log(updatePlatform.grantPrincipal);

    // trigger build after stack creation
    // https://stackoverflow.com/questions/71664346/trigger-an-aws-amplify-build-via-aws-cdk
    // const buildTrigger = new cr.AwsCustomResource(this, 'triggerAppBuild', {
    //   policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
    //     resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
    //   }),
    //   onCreate: {
    //     service: 'Amplify',
    //     action: 'startJob',
    //     physicalResourceId: cr.PhysicalResourceId.of('app-build-trigger'),
    //     parameters: {
    //       appId: amplifyApp.appId,
    //       branchName: main.branchName,
    //       jobType: 'RELEASE',
    //       jobReason: 'Auto Start build',
    //     },
    //   },
    // });
    // buildTrigger.node.addDependency(updatePlatform);

    new CfnOutput(this, 'appId', {
      value: amplifyApp.appId,
    });
    new CfnOutput(this, 'appDomain', {
      value: `https://${main.branchName}.${amplifyApp.appId}.amplifyapp.com`,
    });
  }
}
