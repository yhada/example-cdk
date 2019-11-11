# Option
#===============================================================
OS                   := $(shell uname | tr A-Z a-z )
SHELL                := /bin/bash
APP_ENV              := local

# Const
#===============================================================
name                 := example-cdk
stack_name           := ExampleCdkStack

# Task
#===============================================================
setup:
	npm install
lint:
	npm run lint
test:
	npm test
build:
	npm run build
watch:
	npm run watch
deploy:
	cdk deploy --require-approval never $(stack_name)
diff:
	cdk diff $(stack_name)
destroy:
	cdk destroy $(stack_name)
release: test build
# template:
# 	cdk synth
.PHONY: setup test build watch deploy diff
.DEFAULT_GOAL := build

