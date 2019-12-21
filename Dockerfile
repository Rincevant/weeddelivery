FROM nginx:1.17.1-alpine
COPY /dist/weedFront /usr/share/nginx/html
