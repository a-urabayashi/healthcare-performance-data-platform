# Deploy Directory (WIP)

**🚧 Work In Progress 🚧**

This directory contains Terraform configurations for the main infrastructure deployment.

## Resources Created

- VPC with public and private subnets
- Internet Gateway and routing
- RDS PostgreSQL database instance
- Security groups
- (ECS/Fargate configuration - TODO)

## Files

- `main.tf` - Terraform backend and provider configuration
- `network.tf` - VPC, subnets, and networking resources
- `database.tf` - RDS instance and related resources
- `variables.tf` - Variable definitions
- `locals.tf` - Local values and computed variables

## Usage

```bash
# Initialize Terraform
docker compose run --rm terraform -chdir=deploy init

# Plan changes
docker compose run --rm terraform -chdir=deploy plan

# Apply changes
docker compose run --rm terraform -chdir=deploy apply
```

## Environment Variables Required

- `TF_VAR_db_username` - Database username
- `TF_VAR_db_password` - Database password

## TODO

- [ ] Add ECS cluster and task definitions
- [ ] Configure Application Load Balancer
- [ ] Set up ECR repositories
- [ ] Add CloudWatch logging
- [ ] Configure auto-scaling