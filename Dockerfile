FROM node:12

LABEL "APISeed"="NodeJs API REST SEED"
LABEL "mantainer"="ariel@atariki.com"
LABEL "version"="0.2"

COPY . .
RUN npm install

EXPOSE 3977
CMD [ "node", "build/config/index.js" ]