# =============================================================================
# MODULE: eks (Kubernetes cluster)  —  YOU BUILD THIS  (Milestone 5)
# =============================================================================
# Goal: a managed EKS cluster with a worker node group in the private subnets,
# plus the IAM and OIDC pieces needed for service accounts to assume IAM roles
# (IRSA) — you'll need IRSA for the AWS Load Balancer Controller and for Lambdas
# /pods that talk to AWS.
#
# WHAT TO CREATE:
#   - IAM role for the EKS control plane (AmazonEKSClusterPolicy)
#   - aws_eks_cluster (version = var.cluster_version, subnets = private subnets)
#   - IAM role for nodes (AmazonEKSWorkerNodePolicy, AmazonEKS_CNI_Policy,
#     AmazonEC2ContainerRegistryReadOnly)
#   - aws_eks_node_group (desired/min/max from vars, instance types from vars)
#   - aws_iam_openid_connect_provider for the cluster OIDC issuer (IRSA)
#
# HINT: this is a lot to wire by hand. With instructor approval you MAY use
# terraform-aws-modules/eks/aws and expose its outputs here instead. Either way,
# you must understand what the cluster, node group, and OIDC provider are for.
#
# AFTER APPLY, connect kubectl with:
#   aws eks update-kubeconfig --name <cluster_name> --region <aws_region>
# =============================================================================

# locals {
#   cluster_name = "${var.project_name}-${var.environment}"
# }

# TODO(student): create the cluster, node group, IAM roles, and OIDC provider.
