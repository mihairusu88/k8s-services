# k8s-services

## Frontend

- Access folder
`cd frontend`

- Install dependencies
`pnpm install`

- Build a docker image
`docker build -t k8s/webapp:release0 .`

- Run docker image into a POD
- `cd ..`
- `kubectl apply -f webapp-pod.yaml`
- `kubectl apply -f webapp-service.yaml`

- Open in browser: `http://localhost:30080`

### Enhancement
If you want to speed the build process you need to follow steps below:

- Install dependencies with `pnpm install`
- Build project with `pnpm build`
- Modify Dockerfile

```
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY ./ .
FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
```

- Remove `**/node_modules` and `**/dist` from .dockerignore

## Frontend Pactflow tests

run `pnpm test`

## Backend

- Access folder
`cd backend`

- Install dependencies
`pnpm install`

- Build a docker image
`docker build -t k8s/api:release0 .`

- Run docker image into a POD
- `cd ..`
- `kubectl apply -f api-pod.yaml`
- `kubectl apply -f api-service.yaml`

- Open in browser: `http://localhost:30081`.  E.g: `http://localhost:30081/api/products`