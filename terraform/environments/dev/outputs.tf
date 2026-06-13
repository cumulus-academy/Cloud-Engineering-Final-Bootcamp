# =============================================================================
# Outputs for the dev environment
# =============================================================================
# Uncomment each output as you complete the matching module. These surface the
# values you'll need for kubectl, CI/CD, and DNS.
#
# Outputs that reference a module are commented out so `terraform validate`
# passes before the modules exist. Enable them as you go.
# =============================================================================

# output "vpc_id" {
#   description = "ID of the VPC"
#   value       = module.network.vpc_id
# }

# output "cluster_name" {
#   description = "EKS cluster name (use with: aws eks update-kubeconfig)"
#   value       = module.eks.cluster_name
# }

# output "cluster_endpoint" {
#   description = "EKS API server endpoint"
#   value       = module.eks.cluster_endpoint
# }

# output "ecr_repository_urls" {
#   description = "ECR repository URLs to push images to"
#   value       = module.ecr.repository_urls
# }

# output "db_endpoint" {
#   description = "RDS PostgreSQL endpoint"
#   value       = module.rds.db_endpoint
# }

# output "db_secret_arn" {
#   description = "Secrets Manager ARN holding the DB credentials"
#   value       = module.rds.db_secret_arn
# }

# output "visitor_table_name" {
#   description = "DynamoDB table name for the visitor counter"
#   value       = module.dynamodb.table_name
# }

# output "acm_certificate_arn" {
#   description = "ACM certificate ARN for the ALB Ingress"
#   value       = module.dns_certs.certificate_arn
# }
