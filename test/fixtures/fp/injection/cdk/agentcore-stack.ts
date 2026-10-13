// Excerpt from awslabs/agentcore-samples @ f33b4f1, 05-blueprints/customer-support-agent-with-agentcore/cdk/lib/stacks/agentcore-stack.ts (Apache-2.0). Used as a false-positive regression fixture.
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs/lib/construct';
import * as bedrockagentcore from 'aws-cdk-lib/aws-bedrockagentcore';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda'
            name: `${props.appName}-Gateway`,
            protocolType: "MCP",
            roleArn: agentCoreGatewayRole.roleArn,
            authorizerType: "CUSTOM_JWT",
            authorizerConfiguration: {
                customJwtAuthorizer: {
                    discoveryUrl: `https://cognito-idp.${region}.amazonaws.com/${cognitoUserPool.userPoolId}/.well-known/openid-configuration`,
                    allowedClients: [
                        cognitoUserAppClient.userPoolClientId,  // User-facing client only
                    ],
                    allowedScopes: [
}}}
