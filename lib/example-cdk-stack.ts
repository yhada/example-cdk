import cdk = require('@aws-cdk/core');
import lambda = require("@aws-cdk/aws-lambda");
import apigateway = require("@aws-cdk/aws-apigateway");

export class ExampleCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const env = process.env.ENV || "local";
    // Lambda関数

    const indexSampleLambda = new lambda.Function(this, "indexSampleLambda", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      code: lambda.Code.asset("src/lambda/sample"),
      timeout: cdk.Duration.seconds(60),
      environment: {
        ENV: env
      }
    });

    const versionSampleLambda = new lambda.Function(this, "versionSampleLambda", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "version.handler",
      code: lambda.Code.asset("src/lambda/sample"),
      timeout: cdk.Duration.seconds(60),
      environment: {
        ENV: env
      }
    });

    // API Gateway
    const sampleApi = new apigateway.RestApi(this, "sampleApi", {
      restApiName: "sampleApi",
      description: "example cdk",
    });

    const samplesResource = sampleApi.root.addResource("samples");
    const indexSamplesIntegration = new apigateway.LambdaIntegration(indexSampleLambda);
    const versionSamplesIntegration = new apigateway.LambdaIntegration(versionSampleLambda);

    samplesResource.addMethod("GET", indexSamplesIntegration);
    const versionResorce = samplesResource.addResource("version")
    versionResorce.addMethod("GET", versionSamplesIntegration);
  }
}
