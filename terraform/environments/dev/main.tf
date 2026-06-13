# =============================================================================
# DEV ENVIRONMENT  —  YOUR MAIN ASSIGNMENT
# =============================================================================
# This file wires the modules together. Right now every module call is
# COMMENTED OUT so a fresh clone runs `terraform init` and `terraform validate`
# cleanly with nothing deployed.
#
# Work through it IN ORDER, uncommenting and completing one module at a time.
# Each module lives in ../../modules/<name> and has its own README + TODOs.
#
# Recommended order (maps to the milestones in docs/03-milestones.md):
#   M2  network    -> VPC, subnets, NAT
#   M3  rds        -> PostgreSQL + Secrets Manager
#   M3  dynamodb   -> visitor counter table
#   M4  ecr        -> image repositories
#   M5  eks        -> Kubernetes cluster
#   M6  lambda     -> visitor-counter + contact-form functions
#   M7  dns_certs  -> Route53 + ACM
#
# TIP: run `terraform plan` after each module so you catch problems early.
# =============================================================================

# Handy locals you'll reuse when wiring modules together.
locals {
  name_prefix = "${var.project_name}-${var.environment}"
}

# -----------------------------------------------------------------------------
# M2 — Networking (VPC)
# -----------------------------------------------------------------------------
# module "network" {
#   source       = "../../modules/network"
#   project_name = var.project_name
#   environment  = var.environment
#   vpc_cidr     = var.vpc_cidr
# }

# -----------------------------------------------------------------------------
# M3 — Database (RDS PostgreSQL) — depends on network
# -----------------------------------------------------------------------------
# module "rds" {
#   source             = "../../modules/rds"
#   project_name       = var.project_name
#   environment        = var.environment
#   vpc_id             = module.network.vpc_id
#   private_subnet_ids = module.network.private_subnet_ids
#   db_name            = var.db_name
#   db_instance_class  = var.db_instance_class
#   # TODO: pass the EKS node security group so only the cluster can reach the DB
#   # allowed_security_group_ids = [module.eks.node_security_group_id]
# }

# -----------------------------------------------------------------------------
# M3 — DynamoDB (visitor counter)
# -----------------------------------------------------------------------------
# module "dynamodb" {
#   source       = "../../modules/dynamodb"
#   project_name = var.project_name
#   environment  = var.environment
#   table_name   = "${local.name_prefix}-visitors"
# }

# -----------------------------------------------------------------------------
# M4 — ECR (container image repositories)
# -----------------------------------------------------------------------------
# module "ecr" {
#   source           = "../../modules/ecr"
#   project_name     = var.project_name
#   environment      = var.environment
#   repository_names = ["frontend", "backend"]
# }

# -----------------------------------------------------------------------------
# M5 — EKS cluster — depends on network
# -----------------------------------------------------------------------------
# module "eks" {
#   source              = "../../modules/eks"
#   project_name        = var.project_name
#   environment         = var.environment
#   cluster_version     = var.cluster_version
#   vpc_id              = module.network.vpc_id
#   private_subnet_ids  = module.network.private_subnet_ids
#   node_instance_types = var.node_instance_types
#   node_desired_size   = var.node_desired_size
# }

# -----------------------------------------------------------------------------
# M6 — Lambda microservices — dynamodb must exist for the visitor counter
# -----------------------------------------------------------------------------
# module "visitor_counter_lambda" {
#   source        = "../../modules/lambda"
#   project_name  = var.project_name
#   environment   = var.environment
#   function_name = "${local.name_prefix}-visitor-counter"
#   source_dir    = "${path.root}/../../../lambdas/visitor-counter"
#   environment_variables = {
#     VISITOR_TABLE_NAME = module.dynamodb.table_name
#   }
#   # TODO: grant dynamodb:UpdateItem on module.dynamodb.table_arn (least privilege)
# }
#
# module "contact_form_lambda" {
#   source        = "../../modules/lambda"
#   project_name  = var.project_name
#   environment   = var.environment
#   function_name = "${local.name_prefix}-contact-form"
#   source_dir    = "${path.root}/../../../lambdas/contact-form"
# }

# -----------------------------------------------------------------------------
# M7 — DNS + TLS (Route53 + ACM)
# -----------------------------------------------------------------------------
# module "dns_certs" {
#   source       = "../../modules/dns-certs"
#   project_name = var.project_name
#   domain_name  = var.domain_name
#   # TODO: after your ALB Ingress exists, add an alias A record to the ALB.
# }
