FROM ubuntu:latest

MAINTAINER Michal Jaracz <michaljaracz2@gmail.com>

# install system-wide deps for node, yarn, typescript and ts-node
RUN apt-get -yqq update 
RUN apt-get -yqq install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -yq nodejs

# yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get -yqq update
RUN apt-get -yqq install yarn

# tsc compiler, ts-node
RUN npm install -g typescript
RUN npm install -g ts-node

# copy our application code
ADD api /opt/api
WORKDIR /opt/api

# install projects deps and bundled our project to js
RUN yarn install
RUN tsc -p src/

EXPOSE 8080

CMD [ "node", "./dist/index.js"]
