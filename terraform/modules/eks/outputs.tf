# Outputs other modules / kubectl depend on. Uncomment + complete as you build.

# output "cluster_name" {
#   description = "EKS cluster name"
#   value       = aws_eks_cluster.this.name
# }

# output "cluster_endpoint" {
#   description = "EKS API server endpoint"
#   value       = aws_eks_cluster.this.endpoint
# }

# output "cluster_oidc_issuer_url" {
#   description = "OIDC issuer URL (for IRSA)"
#   value       = aws_eks_cluster.this.identity[0].oidc[0].issuer
# }

# output "node_security_group_id" {
#   description = "Security group of the worker nodes (let RDS allow this)"
#   value       = aws_eks_cluster.this.vpc_config[0].cluster_security_group_id
# }
