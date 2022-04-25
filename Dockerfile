FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci --force
COPY ./ .
RUN npm run build
FROM nginx
RUN mkdir /app
COPY --from=build-stage /app/dist/logos-operation/ /app
COPY nginx.conf /etc/nginx/nginx.conf