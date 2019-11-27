#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
// import { ExampleCdkAPIEndpointStack } from "../lib/example-cdk-api-endpoint";
import { ExampleCdkLambdaCronStack } from "../lib/example-cdk-lamda-cron";

// TODO: env,contextの整理
const app = new cdk.App();
const env: string = app.node.tryGetContext("env");

// new ExampleCdkAPIEndpointStack(
//   app,
//   `ExampleCdkAPIEndpointStack-${env || "dev"}`,
//   {
//     env: {
//       account: process.env.CDK_DEFAULT_ACCOUNT,
//       region: process.env.CDK_DEFAULT_REGION
//     }
//   }
// );

new ExampleCdkLambdaCronStack(
  app,
  `TestHadaCdkLambdaStack-${env || "dev"}`,
  {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION
    }
  }
);
