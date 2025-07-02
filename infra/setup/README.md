# Setup Directory (WIP)

**🚧 Work In Progress 🚧**

This directory contains Terraform configurations for initial AWS setup resources.

## Resources Created

- IAM user for continuous deployment (CD)
- IAM policies for Terraform backend access
- Access keys for CD user

## Files

- `main.tf` - Terraform backend and provider configuration
- `iam.tf` - IAM user and policies definitions
- `variables.tf` - Variable definitions

## Usage

```bash
# Initialize Terraform
docker compose run --rm terraform -chdir=setup init

# Plan changes
docker compose run --rm terraform -chdir=setup plan

# Apply changes
docker compose run --rm terraform -chdir=setup apply
```

## Notes

- The IAM user created here is used for GitHub Actions CI/CD
- Most IAM policies are currently commented out and will be enabled as needed
- Ensure S3 bucket and DynamoDB table exist before running