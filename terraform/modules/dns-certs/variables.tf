variable "project_name" {
  description = "Resource name prefix"
  type        = string
}

variable "domain_name" {
  description = "Public domain for the site, e.g. yourname.dev"
  type        = string
}

variable "create_hosted_zone" {
  description = "Create a new Route53 hosted zone. Set false if you already manage the zone elsewhere."
  type        = bool
  default     = false
}

variable "subject_alternative_names" {
  description = "Extra names on the certificate, e.g. [\"www.yourname.dev\"]"
  type        = list(string)
  default     = []
}
