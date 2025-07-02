# Infrastructure (WIP)

**🚧 Work In Progress 🚧**

This directory contains Terraform configurations for deploying the Healthcare Performance Data Platform infrastructure on AWS.

## Directory Structure

- `setup/` - Initial AWS resources setup (IAM, S3 bucket for Terraform state)
- `deploy/` - Main infrastructure deployment (VPC, RDS, etc.)

## Prerequisites

- Docker and Docker Compose
- AWS CLI configured with appropriate credentials
- Terraform (runs in Docker container)

## Setup Instructions

1. Configure AWS credentials:
   ```bash
   aws configure
   ```

2. Create S3 bucket and DynamoDB table for Terraform state:
   ```bash
   aws s3 mb s3://healthcare-performance-data-platform-tf-state --region ap-northeast-1
   
   aws dynamodb create-table \
     --table-name healthcare-performance-data-platform-tf-lock \
     --attribute-definitions AttributeName=LockID,AttributeType=S \
     --key-schema AttributeName=LockID,KeyType=HASH \
     --billing-mode PAY_PER_REQUEST \
     --region ap-northeast-1
   ```

3. Deploy infrastructure:
   ```bash
   # Setup IAM resources
   docker compose run --rm terraform -chdir=setup init
   docker compose run --rm terraform -chdir=setup apply
   
   # Deploy main infrastructure
   docker compose run --rm terraform -chdir=deploy init
   docker compose run --rm terraform -chdir=deploy apply
   ```

## Known Issues

- PostgreSQL version compatibility - ensure the specified version is available in your AWS region
- DNS resolution in Docker containers - may require network configuration adjustments

## TODO

- [ ] Complete ECS/Fargate configuration
- [ ] Add ALB and Route53 setup
- [ ] Configure monitoring and logging
- [ ] Add backup and disaster recovery configurations