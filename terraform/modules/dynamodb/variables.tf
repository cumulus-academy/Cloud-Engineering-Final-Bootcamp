variable "project_name" {
  description = "Resource name prefix"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g. dev)"
  type        = string
  default     = "dev"
}

variable "table_name" {
  description = "DynamoDB table name for the visitor counter"
  type        = string
}

variable "hash_key" {
  description = "Partition key attribute name"
  type        = string
  default     = "id"
}

variable "billing_mode" {
  description = "PAY_PER_REQUEST (cheapest for low traffic) or PROVISIONED"
  type        = string
  default     = "PAY_PER_REQUEST"
}
