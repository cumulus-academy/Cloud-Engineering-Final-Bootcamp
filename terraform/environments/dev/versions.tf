# =============================================================================
# Terraform & provider configuration  —  PROVIDED BY THE ACADEMY
# =============================================================================
# This file is complete. It pins versions and configures the AWS provider with
# sensible default tags so every resource you create is automatically tagged.
# =============================================================================

terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  # Every resource gets these tags automatically — useful for cost tracking
  # and for cleaning up at the end (terraform destroy).
  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
