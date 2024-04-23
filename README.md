# k8s-services

## Frontend

- Access folder
`cd frontend`

- Install dependencies
`pnpm install`

- Build a docker image
`docker build -t dyno/webapp:release0 .`

- Run docker image into a POD
- `cd ..`
- `kubectl apply -f webapp-pod.yaml`
- `kubectl apply -f webapp-service.yaml`

- Open in browser: `http://localhost:30080`

## Frontend Pactflow tests

run `pnpm test`

## Backend

- Access folder
`cd backend`

- Install dependencies
`pnpm install`

- Build a docker image
`docker build -t dyno/api:release0 .`

- Run docker image into a POD
- `cd ..`
- `kubectl apply -f api-pod.yaml`
- `kubectl apply -f api-service.yaml`

- Open in browser: `http://localhost:30081`.  E.g: `http://localhost:30081/api/products`