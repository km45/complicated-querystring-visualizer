CONFIG := development
SERVICE := develop
WATCH := false

default: help
	@false

.PHONY: help
help:
	@echo 'Usage:'
	@echo '    make COMMAND (OPTION)'
	@echo
	@echo 'Commands:'
	@echo '    help'
	@echo '    up [SERVICE]'
	@echo '    down'
	@echo '    shell [SERVICE]'
	@echo '    clean'
	@echo '    fetch'
	@echo '    sync'
	@echo '    lint'
	@echo '    build [CONFIG] [WATCH]'
	@echo '    unit-test [WATCH]'
	@echo '    e2e-test'
	@echo
	@echo 'Options:'
	@echo '    CONFIG:'
	@echo '        one of following build mode values'
	@echo '            - development (default)'
	@echo '            - production'
	@echo '    SERVICE:'
	@echo '        docker-compose service name [default: develop]'
	@echo '        `make up` can receive multiple services'
	@echo '    WATCH:'
	@echo '        run as watch mode or not'
	@echo '            - true'
	@echo '            - false (default)'

.PHONY: up
up:
	docker-compose build --build-arg VOLUME_UID=$$(id -u) --build-arg VOLUME_GID=$$(id -g) $(SERVICE)
	docker-compose up -d --no-build $(SERVICE)

.PHONY: down
down:
	docker-compose down

.PHONY: shell
shell:
	docker-compose exec --user $$(id -u):$$(id -g) $(SERVICE) /bin/sh

.PHONY: all
all: clean sync lint build unit-test e2e-test

.PHONY: clean
clean:
	docker-compose exec --user $$(id -u):$$(id -g) develop rm -fr dist node_modules

.PHONY: fetch
fetch:
	docker-compose exec --user $$(id -u):$$(id -g) develop npm install

.PHONY: sync
sync:
	docker-compose exec --user $$(id -u):$$(id -g) develop npm ci

.PHONY: lint
lint:
	docker-compose exec --user $$(id -u):$$(id -g) develop npx eslint .eslintrc.js webpack.config.js
	docker-compose exec --user $$(id -u):$$(id -g) develop npx tslint src/ts/**/*.ts src/ts/**/*.tsx

.PHONY: build
build:
ifeq ($(WATCH),true)
	docker-compose exec --user $$(id -u):$$(id -g) develop npx webpack --mode=$(CONFIG) --watch
else
	docker-compose exec --user $$(id -u):$$(id -g) develop npx webpack --mode=$(CONFIG)
endif

.PHONY: test
test: unit-test

.PHONY: unit-test
unit-test:
ifeq ($(WATCH),true)
	docker-compose exec --user $$(id -u):$$(id -g) develop npx jest --coverage --watchAll
else
	docker-compose exec --user $$(id -u):$$(id -g) develop npx jest --coverage
endif

.PHONY: e2e-test
e2e-test:
	docker-compose exec --user $$(id -u):$$(id -g) python pytest src/python/tests
