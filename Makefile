.PHONY: run help

.SILENT:

SHELL := bash -eou pipefail

ifeq ($(shell command -v docker-compose;),)
	COMPOSE := docker compose
else
	COMPOSE := docker-compose
endif

run: ## Run the project using docker-compose
	$(COMPOSE) up --build

help:
	awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
