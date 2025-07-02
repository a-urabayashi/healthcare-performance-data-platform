terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.23.0"
    }
  }
  backend "s3" {
    bucket         = "healthcare-performance-data-platform-tf-state"
    key            = "tf-state-setup"
    region         = "ap-northeast-1"
    encrypt        = true
    dynamodb_table = "healthcare-performance-data-platform-tf-lock"
  }

  required_version = ">= 1.0.0"
}

provider "aws" {
  region = "ap-northeast-1"
  default_tags {
    tags = {
      Project     = "healthcare-performance-data-platform"
      Environment = terraform.workspace
      Project     = var.project
      Contact     = var.contact
      ManagedBy   = "Terraform/setup"
    }
  }
}