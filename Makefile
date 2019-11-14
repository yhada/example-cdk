# Option
#===============================================================
OS                   := $(shell uname | tr A-Z a-z )
SHELL                := /bin/bash
APP_ENV              := dev
REVISION             :=
BUILD_OPTIONS        := -tags netgo -installsuffix netgo

# Const
#===============================================================
name                 := example-cdk
stack_name           := ExampleCdkStack
bin_dir							 := bin

# Task
#===============================================================
setup:
	npm install
fmt:
	# TODO: addedc typescript formatter
	# npm run fmt
lint:
	# TODO: addedc typescript linter
	# npm run lint
test: build
	npm test
build:
	npm run build
watch:
	npm run watch

deploy: release cdk-deploy
destroy: release cdk-destroy
diff: release cdk-diff

# cdk tasks
cdk-deploy:.check-env .set-revision
	cdk deploy --require-approval never \
		--context env=$(APP_ENV) \
		--context revision=$(REVISION) \
		"$(stack_name)-$(APP_ENV)"

cdk-destroy:.check-env .set-revision
	cdk destroy --require-approval never \
		--context env=$(APP_ENV) \
		--context revision=$(REVISION) \
		"$(stack_name)-$(APP_ENV)"

cdk-diff:.check-env .set-revision
	cdk diff --context env=$(APP_ENV) \
		--context revision=$(REVISION) \
		"$(stack_name)-$(APP_ENV)"

cdk-synth:.check-env .set-revision
	cdk synth --context env=$(APP_ENV) \
		--context revision=$(REVISION) \
		"$(stack_name)-$(APP_ENV)"

release: lint fmt test build

.PHONY: setup lint fmt test build watch deploy diff release
.DEFAULT_GOAL := release

.check-env:
APP_ENVS := dev stg prd
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

