import cdk = require("@aws-cdk/core");
import lambda = require("@aws-cdk/aws-lambda");
import apigateway = require("@aws-cdk/aws-apigateway");
import { requiredValidator } from "@aws-cdk/core";

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
    const sampleAPI = new apigateway.RestApi(
      this,
      `${this.stackName}-sampleAPI`,
      {
        restApiName: `${this.stackName}-sampleAPI`,
        description: context.description
      }
    );
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
    const samplesResource = sampleAPI.root.addResource("samples");
    const indexSamplesIntegration = new apigateway.LambdaIntegration(
      indexSampleLambda
    );
    samplesResource.addMethod("GET", indexSamplesIntegration);
  }
}
