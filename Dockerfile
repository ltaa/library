FROM node

RUN mkdir -p /usr/src/app
ADD . /usr/src/app

WORKDIR /usr/src/app
RUN npm install

RUN npm build

EXPOSE 3000

CMD npm start
