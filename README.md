# S-Tour API

A NestJS-based API for the S-Tour application.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (via Docker)
- Redis (via Docker)
- MailDev (via Docker)

## Installation

```bash
# Install dependencies
npm install
```

## Docker Setup

The project uses Docker Compose for managing development services. Start the required services:

```bash
# Start all services
docker-compose up -d

# Check running services
docker-compose ps
```

### Available Services

- **PostgreSQL**: Running on port 5432
  - Username: postgres
  - Password: postgres
  - Database: s_tour

- **Redis**: Running on port 6379
  - Used for BullMQ job queue

- **MailDev**: Running on ports 1025 (SMTP) and 1080 (Web Interface)
  - Access the web interface at http://localhost:1080
  - Configure your application to use SMTP port 1025 for sending emails

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild services
docker-compose up -d --build

# Remove volumes (will delete all data)
docker-compose down -v
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=s_tour

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Mail
MAIL_HOST=localhost
MAIL_PORT=1025

# Application
NODE_ENV=development
PORT=3000
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## Database Management

### Migrations

The application uses MikroORM for database management. Here are the available migration commands:

```bash
# Create a new migration
npm run migration:create

# Apply pending migrations
npm run migration:up

# Revert the last migration
npm run migration:down

# Show pending migrations
npm run migration:pending

# Drop all tables and run all migrations from scratch
npm run migration:fresh
```

### Seeding

To seed the database with initial data:

```bash
# Run the database seeder
npm run seed

# Refresh database (drop all tables, run migrations, and seed)
npm run db:refresh
```

## Testing

```bash
# Unit tests
npm run test
npm run test:watch

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── configs/           # Configuration files
├── database/         # Database migrations and seeds
│   ├── migrations/   # Database migrations
│   └── seeds/       # Database seeders
├── modules/         # Application modules
└── main.ts         # Application entry point
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the UNLICENSED License.
