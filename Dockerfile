FROM node:14.16.0-alpine3.12 as build

COPY webpack.config.js typings.d.ts tsconfig.json package.json index.html mail.svg /build/
COPY src /build/src

WORKDIR /build
RUN npm install && \
    npm run dist

FROM alpine

COPY --from=build /build/build /opt/mega-mailer/build
COPY --from=build /build/index.html /opt/mega-mailer/
COPY --from=build /build/mail.svg /opt/mega-mailer/
