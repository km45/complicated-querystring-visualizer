FROM node:10-alpine

RUN apk update \
    && apk add make \
    && rm -rf /var/cache/apk/*

#
# yarn
#
ENV YARN_VERSION 1.10.1

RUN npm install -g yarn@${YARN_VERSION}

WORKDIR /usr/src/app

CMD [ "tail", "-f", "/dev/null" ]
