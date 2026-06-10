FROM node:20-alpine AS build
WORKDIR /app/frontend
ARG VITE_API_BASE_URL=/api
ARG VITE_WS_URL=/
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_WS_URL=${VITE_WS_URL}
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
COPY shared ../shared
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
