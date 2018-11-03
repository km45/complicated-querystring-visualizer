FROM node:10-alpine

RUN apk update \
    && apk add make \
    && rm -rf /var/cache/apk/*

CMD [ "tail", "-f", "/dev/null" ]
