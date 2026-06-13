# =============================================================================
# Input variables for the dev environment  —  PROVIDED BY THE ACADEMY
# =============================================================================
# The three values you must set come from customization.json:
#   project_name, aws_region, domain_name
# Run `make customize` to generate terraform.tfvars, or copy
# terraform.tfvars.template and fill it in yourself.
#
# The rest have sensible defaults sized for a low-cost student project. You may
# tune them, but you don't have to.
# =============================================================================

# ---- Core identity (from customization.json) --------------------------------

variable "project_name" {
  description = "Resource name prefix, e.g. cloud-portfolio"
  type        = string
}

variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
}

variable "domain_name" {
  description = "Public domain for the site, e.g. yourname.dev (used by Route53/ACM)"
  type        = string
}

variable "environment" {
  description = "Environment name (used in tags and resource names)"
  type        = string
  default     = "dev"
}

# ---- Networking -------------------------------------------------------------

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# ---- EKS --------------------------------------------------------------------

variable "cluster_version" {
  description = "Kubernetes version for the EKS cluster"
  type        = string
  default     = "1.30"
}

variable "node_instance_types" {
  description = "EC2 instance types for the EKS managed node group"
  type        = list(string)
  default     = ["t3.medium"]
}

variable "node_desired_size" {
  description = "Desired number of worker nodes"
  type        = number
  default     = 2
}

# ---- RDS --------------------------------------------------------------------

variable "db_name" {
  description = "PostgreSQL database name"
  type        = string
  default     = "portfolio"
}

variable "db_instance_class" {
  description = "RDS instance class (keep small to control cost)"
  type        = string
  default     = "db.t3.micro"
}
