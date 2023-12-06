# Build stage
FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG URL=http://generator-service:80/get
ENV REACT_APP_BACKEND_URL=$URL
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
