FROM node:16-alpine

RUN mkdir -p /rss_viewer/backend
WORKDIR /rss_viewer/backend

COPY package.json /rss_viewer/backend/
RUN npm install

COPY . /rss_viewer/backend/

EXPOSE 3001

CMD ["npm", "start"]