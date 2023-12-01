FROM node:20-alpine
WORKDIR /app
ADD package*.json /app
RUN npm ci
ADD src /app/src
CMD npm run start
EXPOSE 8000