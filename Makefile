# Option
#===============================================================
OS                   := $(shell uname | tr A-Z a-z )
SHELL                := /bin/bash
APP_ENV              := dev
REVISION             :=
APP_ENVS             := dev stg prd
STACK_NAME           := ExampleCdkAPIEndpointStack

# Const
#===============================================================
name                 := example-cdk
bin_dir              := bin


# Task
#===============================================================

## 必要なツール類をセットアップします
setup:
	go get github.com/Songmu/make2help/cmd/make2help
	npm install

## 全てのソースの整形を行います
fmt:
	# npm run fmt
	@echo "TODO: added typescript linter"

## 全てのソースのLINTを実行します
lint:
	# npm run lint
	@echo "TODO: added typescript linter"

## 全てのユニットテストを実行します
test: build
	npm test

## ビルドを実行します
build:
	npm run build

## デプロイを実行します
deploy: build cdk-deploy

## デプロイしたリソースを破棄します
destroy: build cdk-destroy

## デプロイしたものとの差分を表示します
diff: build cdk-diff

## デプロイ構成を表示します
describe: build cdk-synth

## リリース用のタスクを(lint fmt test build)を一連で行います
release: lint fmt test build

# cdk tasks
cdk-deploy:.check-env .set-revision
	cdk deploy --require-approval never \
		--context env=$(APP_ENV) \
		--context revision=$(REVISION) \
		"$(STACK_NAME)-$(APP_ENV)" \
		--profile lycle-terraformer

cdk-destroy:.check-env .set-revision
	cdk destroy --require-approval never \
		--context env=$(APP_ENV) \
		--context revision=$(REVISION) \
		"$(STACK_NAME)-$(APP_ENV)" \
		--profile lycle-terraformer

cdk-diff:.check-env .set-revision
	cdk diff --context env=$(APP_ENV) \
		--context revision=$(REVISION) \
		"$(STACK_NAME)-$(APP_ENV)" \
		--profile lycle-terraformer

cdk-synth:.check-env .set-revision build
	cdk synth --context env=$(APP_ENV) \
		--context revision=$(REVISION) \
		"$(STACK_NAME)-$(APP_ENV)" \
		--profile lycle-terraformer

npm-watch:
	npm run watch

## ヘルプ
help:
	@make2help $(MAKEFILE_LIST)

.PHONY: setup lint fmt test build watch deploy diff release help
.DEFAULT_GOAL := release

# internal task
.check-env:
ifeq ($(filter $(APP_ENVS),$(APP_ENV)),)
	$(error "invalid APP_ENV=$(APP_ENV)")
endif
ifeq ($(CDK_DEFAULT_ACCOUNT),)
	$(error "invalid CDK_DEFAULT_ACCOUNT=$(CDK_DEFAULT_ACCOUNT)")
endif
ifeq ($(CDK_DEFAULT_REGION),)
	$(error "invalid CDK_DEFAULT_REGION=$(CDK_DEFAULT_REGION)")
endif

.set-revision:
	$(eval REVISION := $(shell if [[ $$REV = "" ]]; then git rev-parse --short HEAD; else echo $$REV;fi;))
