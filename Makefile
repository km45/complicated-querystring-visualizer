CONFIG := development
SERVICE := develop
TTY := true
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
	@echo '    clean [TTY]'
	@echo '    fetch [TTY]'
	@echo '    sync [TTY]'
	@echo '    lint [TTY] [AUTOFIX]'
	@echo '    build [CONFIG] [TTY] [WATCH]'
	@echo '    dev-server [CONFIG]'
	@echo '    unit-test [TTY] [WATCH]'
	@echo '    e2e-test [TTY]'
	@echo '    audit [TTY]'
	@echo '    lint-dockerfile'
	@echo '    outdated'
	@echo '    update'
	@echo '    check-version [TTY]'
	@echo
	@echo 'Options:'
	@echo '    CONFIG:'
	@echo '        one of following build mode values'
	@echo '            - development (default)'
	@echo '            - production'
	@echo '    SERVICE:'
	@echo '        docker-compose service name [default: develop]'
	@echo '        `make up` can receive multiple services'
	@echo '    TTY:'
	@echo '        allocate pseudo-tty or not'
	@echo '            - true (default)'
	@echo '            - false'
	@echo '    WATCH:'
	@echo '        run as watch mode or not'
	@echo '            - true'
	@echo '            - false (default)'
	@echo '    AUTOFIX:'
	@echo '        fix erros automatically or not'
	@echo '            - true'
	@echo '            - false (default)'

.PHONY: up
up:
	docker-compose build $(SERVICE)
	docker-compose up -d --no-build $(SERVICE)

.PHONY: down
down:
	docker-compose down

.PHONY: shell
shell:
	# Use fixed value for -t option as if TTY=true
	$$(misc/docker-exec-command -t true) $(SERVICE) /bin/sh

.PHONY: all
all: clean sync lint build unit-test e2e-test

.PHONY: clean
clean:
	$$(misc/docker-exec-command -t $(TTY)) develop rm -fr dist node_modules

.PHONY: fetch
fetch:
	$$(misc/docker-exec-command -t $(TTY)) develop npm install

.PHONY: sync
sync:
	$$(misc/docker-exec-command -t $(TTY)) develop npm ci

.PHONY: lint
lint:
ifeq ($(AUTOFIX),true)
	$$(misc/docker-exec-command -t $(TTY)) develop npx eslint . --config .eslintrc_ts.js --ext .ts,.tsx --fix
	$$(misc/docker-exec-command -t $(TTY)) develop npx eslint . --config .eslintrc_js.js --ext .js,.jsx --fix
else
	$$(misc/docker-exec-command -t $(TTY)) develop npx eslint . --config .eslintrc_ts.js --ext .ts,.tsx
	$$(misc/docker-exec-command -t $(TTY)) develop npx eslint . --config .eslintrc_js.js --ext .js,.jsx
endif

.PHONY: build
build:
ifeq ($(WATCH),true)
	$$(misc/docker-exec-command -t $(TTY)) develop npx webpack --mode=$(CONFIG) --watch
else
	$$(misc/docker-exec-command -t $(TTY)) develop npx webpack --mode=$(CONFIG)
endif

.PHONY: dev-server
dev-server:
	# Use fixed value for -t option as if TTY=true
	$$(misc/docker-exec-command -t true) develop npx webpack-dev-server --mode=$(CONFIG) --public $$(docker-compose port develop 8080)

.PHONY: test
test: unit-test

.PHONY: unit-test
unit-test:
ifeq ($(WATCH),true)
	$$(misc/docker-exec-command -t $(TTY)) develop npx jest --coverage --watchAll
else
	$$(misc/docker-exec-command -t $(TTY)) develop npx jest --coverage
endif

.PHONY: e2e-test
e2e-test:
	$$(misc/docker-exec-command -t $(TTY)) python pytest src/python/tests

.PHONY: audit
audit:
	$$(misc/docker-exec-command -t $(TTY)) develop npm audit

.PHONY: lint-dockerfile
lint-dockerfile:
	docker run --rm -i hadolint/hadolint < dockerfiles/chore/Dockerfile
	docker run --rm -i hadolint/hadolint < dockerfiles/python/Dockerfile

.PHONY: outdated
outdated:
	$$(misc/docker-exec-command -t $(TTY)) develop npm outdated

.PHONY: update
update:
	$$(misc/docker-exec-command -t true) develop npm update

.PHONY: check-version
check-version:
	$$(misc/docker-exec-command -t $(TTY)) chore test $$(jq .version < package.json) = $$(jq .version < package-lock.json)
