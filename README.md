# example-cdk

AWS Cloud Development Kit Example

## Getting Started

- サンプルをdeployする

### Prerequisites

What things you need to install the software and how to install them

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
```

## Running the tests

```shell
make test
```

## Build

```shell
make build
```

## Deployment

deploy api-gateway and lamda

```shell
make release # fmt lint test build
make deploy APP_ENV=dev
```

destroy api-gateway and lamda

```shell
make destory APP_ENV=dev
```


