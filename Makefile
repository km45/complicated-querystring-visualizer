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
all: fetch tslint build test

.PHONY: fetch
fetch:
	yarn install

.PHONY: build
build:
ifeq ($(WATCH),true)
	yarn run webpack --config webpack.$(CONFIG).js --watch
endif
	yarn run webpack --config webpack.$(CONFIG).js

.PHONY: clean
clean:
	rm -fr dist node_modules

.PHONY: test
test:
ifeq ($(WATCH),true)
	yarn run jest --coverage --watchAll
else
	yarn run jest --coverage
endif

.PHONY: tslint
tslint:
	yarn run tslint src/ts/**/*.ts src/ts/**/*.tsx
