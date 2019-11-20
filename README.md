# example-cdk

AWS Cloud Development Kit Example for APIGateway + LambdaFunction

## Getting Started

- apidateway + lambdaのサンプルをdeployする

### Prerequisites

node

```shell
nodenv install 12.12.0
nodenv local 12.12.0
npm install -g npm
```

cdk

```shell
npm install -g aws-cdk
cdk --version
```

sam-cli

```shell
brew tap aws/tap
brew install aws-sam-cli
sam --version
```

### Installing

set up repository

```shell
git clone https://github.com/taguchi-so/example-cdk.git
cd example-cdk
make setup
make help
```

## Running the tests

```shell
make test
```

## Build

```shell
make build
```

## Deployment(CDK)

deploy api-gateway and lamda and a record

- set environments

```shell
export CDK_DEFAULT_ACCOUNT="*****" \
export CDK_DEFAULT_REGION="ap-northeast-1" \
```

- edit cdk.json

```json
{
  "context": {
    "dev": {
      "description": "Development Example-CDK",
      "customDomainName": "hoge.dev.example.com",
      "certificateArn": "arn:aws:acm:ap-northeast-1:999999999999:certificate/ffffffff-ffff-ffff-ffff-ffffffffffff",
      "hostedZoneId": "XXXXXXXXXXXXXX",
      "bucketName": "example.com-bucketName",
    },
    "stg": {
      "description": "Staging Example-CDK",
      "customDomainName": "hoge.stg.example.com",
      "certificateArn": "arn:aws:acm:ap-northeast-1:999999999999:certificate/ffffffff-ffff-ffff-ffff-ffffffffffff",
      "hostedZoneId": "XXXXXXXXXXXXXX",
      "bucketName": "example.com-bucketName",

    },
    "prd": {
      "description": "Product Example-CDK",
      "customDomainName": "hoge.example.com",
      "certificateArn": "arn:aws:acm:ap-northeast-1:999999999999:certificate/ffffffff-ffff-ffff-ffff-ffffffffffff",
      "hostedZoneId": "XXXXXXXXXXXXXX",
      "bucketName": "example.com-bucketName",
    }
  },
  "app": "npx ts-node bin/example-cdk.ts"
}
```

destroy api-gateway and lamda and a record

```shell
# apigateway + lambda + route53(a-record)
make deploy APP_ENV=dev STACK_NAME=ExampleCdkAPIEndpointStack
# lamda + cloudwatchevent + s3
make deploy APP_ENV=dev STACK_NAME=ExampleCdkLambdaCronStack

# check endpoint
curl -i https://hoge.dev.example.com/v1/samples
> ...

# check resorce
aws cloudformation describe-stacks | jq '.Stacks[] | select(.StackName=="ExampleCdkStack-dev")'
aws lambda list-functions | jq '.Functions[] | select(.FunctionName=="ExampleCdkStack-dev-samplesLambda")'
aws apigateway get-rest-apis | jq '.items[] | select(.name=="ExampleCdkStack-dev-RestApi")'
aws apigateway get-domain-names| jq '.items[] | select(.domainName=="hoge.dev.example.com")'
> ...

```

destroy api-gateway and lamda and a record

```shell
# apigateway + lambda + route53(a-record)
make destory APP_ENV=dev STACK_NAME=ExampleCdkAPIEndpointStack
# lamda + cloudwatchevent + s3
make destory APP_ENV=dev STACK_NAME=ExampleCdkLambdaCronStack
```
