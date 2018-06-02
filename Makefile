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
	npm install

.PHONY: build
build:
	npm run build:$(CONFIG)

.PHONY: watch-build
watch-build:
	npm run build:$(CONFIG) -- --watch

.PHONY: clean
clean:
	rm -fr dist node_modules

.PHONY: test
test:
	npm run test

.PHONY: watch-test
watch-test:
	npm run test -- --watchAll
