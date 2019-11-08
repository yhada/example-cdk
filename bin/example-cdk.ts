#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { ExampleCdkStack } from '../lib/example-cdk-stack';

const app = new cdk.App();
new ExampleCdkStack(app, 'ExampleCdkStack');
