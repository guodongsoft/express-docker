FROM node:11.1.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 8080

ENTRYPOINT ["sh", "./entrypoint.sh"]
