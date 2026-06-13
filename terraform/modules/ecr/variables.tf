variable "project_name" {
  description = "Resource name prefix"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g. dev)"
  type        = string
  default     = "dev"
}

variable "repository_names" {
  description = "Short names of the repositories to create (e.g. frontend, backend)"
  type        = list(string)
  default     = ["frontend", "backend"]
}

variable "image_tag_mutability" {
  description = "MUTABLE or IMMUTABLE"
  type        = string
  default     = "MUTABLE"
}

variable "scan_on_push" {
  description = "Scan images for vulnerabilities on push"
  type        = bool
  default     = true
}
