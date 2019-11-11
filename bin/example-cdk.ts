#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { ExampleCdkStack } from "../lib/example-cdk-stack";

const app = new cdk.App();

const env: string = app.node.tryGetContext("env");
console.log(`ExampleCdkStack-${env || "dev"}`);
new ExampleCdkStack(app, `ExampleCdkStack-${env || "dev"}`);
