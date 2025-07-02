# Backend API (WIP)

**🚧 Work In Progress 🚧**

This directory contains the Django REST API backend for the Healthcare Performance Data Platform.

## Overview

The backend provides:
- RESTful API for frontend applications
- Authentication and authorization
- Data access layer for analytics results
- Integration with ETL pipeline outputs
- Business logic for healthcare metrics

## Technology Stack

- **Django 5.1** - Web framework
- **Django REST Framework** - API framework
- **PostgreSQL** - Primary database
- **Docker** - Containerization
- **Poetry** - Dependency management

## Directory Structure

- `app/` - Main Django application
  - `config/` - Django settings and configuration
  - `core/` - Core business logic and models
  - `manage.py` - Django management script
- `db/` - Database Docker configuration
- `scripts/` - Utility scripts
- `docker-compose.yml` - Docker configuration for local development
- `Dockerfile` - Container definition
- `pyproject.toml` - Poetry dependencies

## Setup Instructions

```bash
# Build and start the backend
docker-compose up -d

# Run migrations
docker-compose exec api python manage.py migrate

# Create superuser
docker-compose exec api python manage.py createsuperuser

# Access API
# http://localhost:8000/api/
# Admin: http://localhost:8000/admin/
```

## API Endpoints

- `/api/health/` - Health check endpoint
- `/api/metrics/` - Healthcare performance metrics
- `/api/core/` - Core business endpoints

## Models

- `Clinic` - Healthcare clinic information
- `Metric` - Performance metrics data
- `Report` - Generated reports

## TODO

- [ ] Complete API endpoint implementations
- [ ] Add comprehensive test coverage
- [ ] Implement caching strategy
- [ ] Set up API documentation (Swagger/OpenAPI)
- [ ] Add rate limiting and throttling
- [ ] Implement audit logging
- [ ] Configure CORS properly
- [ ] Add authentication/authorization
- [ ] Integrate with ETL pipeline outputs