FROM node:alpine

ARG DESTINATION_DIR=/usr/app

COPY package.json \
    index.js \
    ${DESTINATION_DIR}/

WORKDIR ${DESTINATION_DIR}/

RUN yarn

CMD yarn start