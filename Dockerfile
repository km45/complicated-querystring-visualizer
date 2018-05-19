FROM node:8-alpine

RUN apk update \
    && apk add make \
    && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

CMD [ "tail", "-f", "/dev/null" ]
