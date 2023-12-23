FROM node:18 as build

COPY tsconfig.json package.json .yarnrc.yml yarn.lock index.html mail.svg /build/
COPY src /build/src

WORKDIR /build
RUN yarn && \
    yarn dist

FROM alpine

COPY --from=build /build/dist /opt/mega-mailer/dist
COPY --from=build /build/mail.svg /opt/mega-mailer/
