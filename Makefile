# Option
#===============================================================
OS            := $(shell uname | tr A-Z a-z )
SHELL         := /bin/bash

# Const
#===============================================================
name                 := example-cdk
stack_name           := ExampleCdkStack

# Task
#===============================================================
setup:
	npm install
build:
	npm run build
watch:
	npm run watch
deploy:
	cdk deploy $(stack_name)
diff:
	cdk diff $(stack_name)
destroy:
	cdk destroy $(stack_name)

# template:
# 	cdk synth
.PHONY: build watch deploy diff
.DEFAULT_GOAL := build

