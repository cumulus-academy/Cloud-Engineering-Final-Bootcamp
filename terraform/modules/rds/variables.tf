variable "project_name" {
  description = "Resource name prefix"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g. dev)"
  type        = string
  default     = "dev"
}

variable "vpc_id" {
  description = "VPC the database lives in"
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnet IDs for the DB subnet group"
  type        = list(string)
}

variable "db_name" {
  description = "Initial database name"
  type        = string
  default     = "portfolio"
}

variable "db_username" {
  description = "Master username"
  type        = string
  default     = "portfolio"
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "allocated_storage" {
  description = "Storage in GiB"
  type        = number
  default     = 20
}

variable "engine_version" {
  description = "PostgreSQL engine version"
  type        = string
  default     = "16"
}

variable "allowed_security_group_ids" {
  description = "Security groups allowed to reach the DB on 5432 (e.g. EKS nodes)"
  type        = list(string)
  default     = []
}

variable "multi_az" {
  description = "Run a standby in another AZ (costs more)"
  type        = bool
  default     = false
}
