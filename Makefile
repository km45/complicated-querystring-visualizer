# CONFIG = development | production
CONFIG = development
# WATCH = true | false
WATCH = false

default: all

.PHONY: up
up:
	docker-compose up -d --build

.PHONY: down
down:
	docker-compose down

.PHONY: shell
shell:
	docker-compose exec --user `id -u`:`id -g` develop /bin/sh

.PHONY: all
all: fetch lint build test

.PHONY: fetch
fetch:
	npm install

.PHONY: build
build:
ifeq ($(WATCH),true)
	npx webpack --mode=$(CONFIG) --watch
endif
	npx webpack --mode=$(CONFIG)

.PHONY: clean
clean:
	rm -fr dist node_modules

.PHONY: test
test:
ifeq ($(WATCH),true)
	npx jest --coverage --watchAll
else
	npx jest --coverage
endif

.PHONY: lint
lint:
	npx eslint .eslintrc.js webpack.config.js
	npx tslint src/ts/**/*.ts src/ts/**/*.tsx

.PHONY: e2etest
e2etest:
	docker-compose exec --user `id -u`:`id -g` python pytest src/python/tests
