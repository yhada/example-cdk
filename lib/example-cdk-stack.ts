import cdk = require("@aws-cdk/core");
import lambda = require("@aws-cdk/aws-lambda");
import apigateway = require("@aws-cdk/aws-apigateway");

interface StageContext {
  description: string;
}

export class ExampleCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // envripmnent
    const env: string = this.node.tryGetContext("env") || "dev";
    const revision: string = this.node.tryGetContext("revision") || "";
    const context: StageContext = this.node.tryGetContext(env) || {
      description: ""
    };

    // setup lamda function
    let lambdaName;
    lambdaName = "indexSampleLambda";
    const indexSampleLambda = new lambda.Function(
      this,
      `${this.stackName}-${lambdaName}`,
      {
        functionName: `${this.stackName}-${lambdaName}`,
        runtime: lambda.Runtime.NODEJS_10_X,
        handler: "index.handler",
        code: lambda.Code.asset("src/lambda/sample"),
        timeout: cdk.Duration.seconds(60),
        environment: {
          ENV: env,
          REVISION: revision
        }
      }
    );

    lambdaName = "versionSampleLambda";
    const versionSampleLambda = new lambda.Function(
      this,
      `${this.stackName}-${lambdaName}`,
      {
        functionName: `${this.stackName}-${lambdaName}`,
        runtime: lambda.Runtime.NODEJS_10_X,
        handler: "version.handler",
        code: lambda.Code.asset("src/lambda/sample"),
        timeout: cdk.Duration.seconds(60),
        environment: {
          ENV: env,
          REVISION: revision
        }
      }
    );

    // set up API Gateway
    const indexSamplesIntegration = new apigateway.LambdaIntegration(
      indexSampleLambda
    );
    const versionSamplesIntegration = new apigateway.LambdaIntegration(
      versionSampleLambda
    );
    const sampleAPI = new apigateway.RestApi(
      this,
      `${this.stackName}-sampleAPI`,
      {
        restApiName: `${this.stackName}-sampleAPI`,
        description: context.description
      }
    );
    const samplesResource = sampleAPI.root.addResource("samples");
    const versionResorce = samplesResource.addResource("version");
    samplesResource.addMethod("GET", indexSamplesIntegration);
    versionResorce.addMethod("GET", versionSamplesIntegration);
  }
}
