# =============================================================================
# MODULE: network (VPC)  —  YOU BUILD THIS  (Milestone 2)
# =============================================================================
# Goal: a VPC with public + private subnets across `az_count` AZs, an internet
# gateway, and NAT for private egress. EKS and RDS will live in the private
# subnets; the ALB will live in the public subnets.
#
# Subnets must be tagged so the AWS Load Balancer Controller can discover them:
#   public  subnets: "kubernetes.io/role/elb"          = "1"
#   private subnets: "kubernetes.io/role/internal-elb"  = "1"
#   all     subnets: "kubernetes.io/cluster/<cluster>"  = "shared"   (add in M5)
#
# WHAT TO CREATE (resources you need to write below):
#   - data "aws_availability_zones" "available" {}
#   - aws_vpc                       (enable_dns_hostnames = true)
#   - aws_subnet (public)  x az_count   (map_public_ip_on_launch = true)
#   - aws_subnet (private) x az_count
#   - aws_internet_gateway
#   - aws_eip + aws_nat_gateway     (gated on var.enable_nat_gateway)
#   - aws_route_table (public -> igw) + associations
#   - aws_route_table (private -> nat) + associations
#
# HINT: writing this by hand is great practice. If your instructor allows it,
# you MAY instead call terraform-aws-modules/vpc/aws and map its outputs to the
# outputs.tf in this module. Ask first.
#
# Use var.vpc_cidr with cidrsubnet() to carve subnet ranges, e.g.:
#   cidrsubnet(var.vpc_cidr, 4, count.index)            # public
#   cidrsubnet(var.vpc_cidr, 4, count.index + var.az_count)  # private
# =============================================================================

# locals {
#   name = "${var.project_name}-${var.environment}"
# }

# TODO(student): create the resources described above.
