# =============================================================================
# terraform.tfvars  (TEMPLATE)
# =============================================================================
# Do not edit the rendered terraform.tfvars by hand — edit customization.json
# at the repo root and run `make customize`. This template is rendered to
# terraform.tfvars (which is git-ignored, because it's yours).
# =============================================================================

project_name = "cloud-portfolio"
aws_region   = "us-east-1"
domain_name  = "yourname.dev"

# Optional overrides (defaults are fine for a low-cost student project):
# environment         = "dev"
# vpc_cidr            = "10.0.0.0/16"
# cluster_version     = "1.30"
# node_instance_types = ["t3.medium"]
# node_desired_size   = 2
# db_instance_class   = "db.t3.micro"
