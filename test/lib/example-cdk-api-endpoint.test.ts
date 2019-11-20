import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle
} from "@aws-cdk/assert";
import cdk = require("@aws-cdk/core");
import ExampleCdk = require("../../lib/example-cdk-api-endpoint");

test("Empty Stack", () => {
  // TODO: cdk test
  // const app = new cdk.App();
  // WHEN
  // const stack = new ExampleCdk.ExampleCdkStack(app, "MyTestStack");
  // THEN
  // expectCDK(stack).to(matchTemplate({
  //   "Resources": {}
  // }, MatchStyle.EXACT))
});
