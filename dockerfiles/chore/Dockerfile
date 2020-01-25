FROM alpine:3

# hadolint ignore=DL3018
RUN apk update \
    && apk add --no-cache jq \
    && rm -rf /var/cache/apk/*

CMD ["tail", "-f", "/dev/null"]
