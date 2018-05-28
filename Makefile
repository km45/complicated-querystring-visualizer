# CONFIG = develop | production
CONFIG = develop

.PHONY: up
up:
	docker-compose up -d --build

.PHONY: down
down:
	docker-compose down

.PHONY: shell
shell:
	docker-compose exec --user `id -u`:`id -g` develop /bin/sh

.PHONY: install
install:
	npm install

.PHONY: build
build:
	npm run build:$(CONFIG)

.PHONY: watch
watch:
	npm run watch

.PHONY: clean
clean:
	rm -fr dist node_modules

.PHONY: test
test:
	npm run test
