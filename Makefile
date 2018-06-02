# CONFIG = develop | production
CONFIG = develop

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
all: fetch build test

.PHONY: fetch
fetch:
	yarn install

.PHONY: build
build:
	yarn run webpack --config webpack.$(CONFIG).js

.PHONY: watch-build
watch-build:
	yarn run webpack --config webpack.$(CONFIG).js --watch

.PHONY: clean
clean:
	rm -fr dist node_modules

.PHONY: test
test:
	yarn run jest --coverage

.PHONY: watch-test
watch-test:
	yarn run jest --coverage --watchAll
