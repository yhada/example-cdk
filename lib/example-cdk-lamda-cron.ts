import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";
// import * as events from "@aws-cdk/aws-events";
// import * as targets from "@aws-cdk/aws-events-targets";

// import { RemovalPolicy } from "@aws-cdk/core";

interface StageContext {
  bucketName: string;
}
export class ExampleCdkLambdaCronStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // TODO: environment from ?
    const env: string = this.node.tryGetContext("env") || "dev";
    const revision: string = this.node.tryGetContext("revision") || "";
    const context: StageContext = this.node.tryGetContext(env) || {};

    if (context.bucketName == "") {
      throw new Error(
        `error: invalid context:${JSON.stringify({
          env,
          revision,
          context
        })}`
      );
    }
    const bucket = new s3.Bucket(this, "hadaBucket", {
      versioned: false,
      bucketName: context.bucketName,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const getPolicyStatement = new iam.PolicyStatement();
    getPolicyStatement.addActions("s3:GetObject");
    getPolicyStatement.addResources(`arn:aws:s3:::${context.bucketName}/*`);
    getPolicyStatement.addServicePrincipal(`logs.${this.region}.amazonaws.com`);
    bucket.addToResourcePolicy(getPolicyStatement);

    const putPolicyStatement = new iam.PolicyStatement();
    putPolicyStatement.addActions("s3:PutObject");
    putPolicyStatement.addResources(`arn:aws:s3:::${context.bucketName}/*`);
    putPolicyStatement.addServicePrincipal(`logs.${this.region}.amazonaws.com`);
    putPolicyStatement.addCondition("StringEquals", {
      "s3:x-amz-acl": "bucket-owner-full-control"
    });
    bucket.addToResourcePolicy(putPolicyStatement);

    new lambda.Function(this, "hadaLambda", {
      code: lambda.Code.asset("src/lambda/sample"),
      handler: "cron.handler",
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.NODEJS_10_X,
      environment: {
        ENV: env,
        REVISION: revision
      }
    });

    // const rule = new events.Rule(this, "Rule", {
    //   schedule: events.Schedule.expression("cron(0 18 ? * MON-FRI *)")
    // });
    // rule.addTarget(new targets.LambdaFunction(cronLambda));
  }
}
