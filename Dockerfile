FROM node:20 AS build

COPY tsconfig.json package.json .yarnrc.yml yarn.lock index.html mail.svg /build/
COPY src /build/src

WORKDIR /build
RUN corepack enable && \
    yarn && \
    yarn dist

FROM alpine

COPY --from=build /build/dist /opt/mega-mailer/dist
COPY --from=build /build/mail.svg /opt/mega-mailer/
