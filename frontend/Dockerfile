FROM node:16-alpine

RUN mkdir -p /rss_viewer/frontend
WORKDIR /rss_viewer/frontend

COPY package.json /rss_viewer/frontend/
RUN npm install

COPY . /rss_viewer/frontend/

EXPOSE 3000

CMD ["npm", "start"]