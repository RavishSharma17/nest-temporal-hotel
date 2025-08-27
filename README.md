<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS with Temporal.io Integration

This project demonstrates how to integrate Temporal.io workflows with a NestJS application, featuring Redis for data storage and search capabilities.

## Prerequisites

1. **Docker** - Required to run Temporal server locally
2. **Node.js** - Version 16 or higher

## Setup Instructions

### 1. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit the `.env` file to match your Temporal server and Redis configuration:

```bash
# Temporal Configuration
TEMPORAL_ADDRESS=localhost:7233
TEMPORAL_NAMESPACE=default
TEMPORAL_TASK_QUEUE=hotels-task-queue

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 2. Start Temporal Server Locally

Run the following command to start Temporal server using Docker:

```bash
docker run -p 7233:7233 -p 8233:8233 temporalio/auto-setup:latest
```

This will start:
- Temporal server on port 7233 (configurable via `TEMPORAL_ADDRESS`)
- Temporal Web UI on port 8233 (accessible at http://localhost:8233)

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Applications

**Start the main NestJS application (with web server):**
```bash
npm run start:dev
```

**Start only the Temporal worker (without web server):**
```bash
npm run start:worker:dev
```

## Docker Deployment

This project includes Docker support for containerized deployment with separate images for the API server and Temporal worker.

### Docker Images

The project provides two optimized Docker images:

1. **API Server Image** (`nest-temporal-api`) - Runs the NestJS web server
2. **Worker Image** (`nest-temporal-worker`) - Runs the Temporal worker process

### Building Docker Images

Build both images using the provided Dockerfiles:

```bash
# Build the API server image
docker build -f Dockerfile.api -t nest-temporal-api .

# Build the worker image
docker build -f Dockerfile.worker -t nest-temporal-worker .
```

### Running with Docker

**Start the API server container:**
```bash
docker run -d \
  --name nest-temporal-api \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  -e TEMPORAL_ADDRESS=your-temporal-server:7233 \
  nest-temporal-api
```

**Start the worker container:**
```bash
docker run -d \
  --name nest-temporal-worker \
  -e NODE_ENV=production \
  -e TEMPORAL_ADDRESS=your-temporal-server:7233 \
  nest-temporal-worker
```

### Docker Compose (Recommended)

For easier orchestration, use Docker Compose:

```yaml
version: '3.8'
services:

  temporal:
    image: temporalio/auto-setup:latest
    ports:
      - "7233:7233"
      - "8233:8233"
    
  nest-temporal-api:
    build:
      context: .
      dockerfile: Dockerfile.api
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - TEMPORAL_ADDRESS=temporal:7233
    depends_on:
      - temporal

  nest-temporal-worker:
    build:
      context: .
      dockerfile: Dockerfile.worker
    environment:
      - NODE_ENV=production
      - TEMPORAL_ADDRESS=temporal:7233
    depends_on:
      - temporal

```

Save this as `docker-compose.yml` and run:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Docker Environment Variables

When running in Docker, ensure these environment variables are set:

| Variable | Description | Docker Default |
|----------|-------------|----------------|
| `TEMPORAL_ADDRESS` | Temporal server address | `temporal:7233` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | API server port | `3000` |

### Production Docker Deployment

For production deployment:

1. **Build optimized images:**
   ```bash
   docker build -f Dockerfile.api -t your-registry/nest-temporal-api:latest .
   docker build -f Dockerfile.worker -t your-registry/nest-temporal-worker:latest .
   ```

2. **Push to registry:**
   ```bash
   docker push your-registry/nest-temporal-api:latest
   docker push your-registry/nest-temporal-worker:latest .
   ```

3. **Deploy with orchestration tools** (Kubernetes, Docker Swarm, etc.)

### Docker Features

- **Multi-stage builds** for optimized image sizes
- **Non-root user** for security
- **Production-ready** configuration
- **Proper signal handling** for graceful shutdowns
- **Health checks** ready for orchestration
- **Separate images** for independent scaling

### Docker Troubleshooting

**Container connectivity issues:**
```bash
# Check container logs
docker logs nest-temporal-api
docker logs nest-temporal-worker

# Check network connectivity
docker exec nest-temporal-api ping redis
docker exec nest-temporal-worker ping temporal
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `TEMPORAL_ADDRESS` | Temporal server address and port | `localhost:7233` |
| `TEMPORAL_NAMESPACE` | Temporal namespace to use | `default` |
| `TEMPORAL_TASK_QUEUE` | Task queue name for workflows | `hotels-task-queue` |
| `PORT` | Port for the web server | `3000` |
| `NODE_ENV` | Environment mode | `development` |

### Hotel API Endpoints

The application provides hotel management endpoints:

- `GET supplierName/hotels` - Gets hotels by supplierName
- `GET /api/hotels?city=...&minPrice=...&maxPrice=...` - Search hotels by city and price

## Troubleshooting

## Available Scripts

- `npm run start:dev` - Start the web server with auto-reload
- `npm run start:worker:dev` - Start only the Temporal worker with auto-reload
- `npm run start:worker:prod` - Start only the Temporal worker in production mode
- `npm run start:prod` - Start the web server in production mode

## Temporal Web UI

Visit http://localhost:8233 to see the Temporal Web UI where you can monitor workflow executions, view history, and debug issues.

## Production Deployment

For production deployment, update your environment variables:

```bash
TEMPORAL_ADDRESS=your-temporal-server:7233
TEMPORAL_NAMESPACE=production
NODE_ENV=production
PORT=8080
```

## Architecture

```
HTTP Request → Controllers → Services/Temporal Client → Temporal Server
                                                                ↓
                                          Temporal Worker ← Activities
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).