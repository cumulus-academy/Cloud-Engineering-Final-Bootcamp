variable "project_name" {
  description = "Resource name prefix"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g. dev)"
  type        = string
  default     = "dev"
}

variable "function_name" {
  description = "Full Lambda function name"
  type        = string
}

variable "source_dir" {
  description = "Path to the function source directory (contains index.js)"
  type        = string
}

variable "handler" {
  description = "Lambda handler"
  type        = string
  default     = "index.handler"
}

variable "runtime" {
  description = "Lambda runtime"
  type        = string
  default     = "nodejs20.x"
}

variable "environment_variables" {
  description = "Environment variables passed to the function"
  type        = map(string)
  default     = {}
}

variable "timeout" {
  description = "Function timeout in seconds"
  type        = number
  default     = 10
}
