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

diff:.check-env
	cdk diff $(stack_name) --context env=$(APP_ENV) "$(stack_name)-$(APP_ENV)"
deploy:.check-env .set-revision release
	cdk deploy --require-approval never --context env=$(APP_ENV) --context revision=$(REVISION) "$(stack_name)-$(APP_ENV)"
destroy:.check-env
	cdk destroy --context env=$(APP_ENV) "$(stack_name)-$(APP_ENV)"

# template:
# 	cdk synth
release: lint fmt test build
.PHONY: setup lint fmt test build watch deploy diff release
.DEFAULT_GOAL := build

.check-env:
APP_ENVS := dev stg prd
ifeq ($(filter $(APP_ENVS),$(APP_ENV)),)
$(error "invalid APP_ENV=$(APP_ENV)")
endif

.set-revision:
	$(eval REVISION := $(shell if [[ $$REV = "" ]]; then git rev-parse --short HEAD; else echo $$REV;fi;))

