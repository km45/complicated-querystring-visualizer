FROM node:10-alpine

RUN apk update \
    && apk add make shadow \
    && rm -rf /var/cache/apk/*

#
# Resolve docker volumes owner problem
#
# Change uid and gid for non root guest user "node" to match host user's.
ARG VOLUME_UID
ARG VOLUME_GID
ARG GUEST_USER_NAME='node'

RUN usermod -u ${VOLUME_UID} ${GUEST_USER_NAME}
RUN groupmod -g ${VOLUME_GID} ${GUEST_USER_NAME}

CMD [ "tail", "-f", "/dev/null" ]
