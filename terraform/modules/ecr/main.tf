# =============================================================================
# MODULE: ecr (container registries)  —  YOU BUILD THIS  (Milestone 4)
# =============================================================================
# Goal: one ECR repository per image (frontend, backend). GitHub Actions pushes
# images here; EKS pulls from here.
#
# WHAT TO CREATE:
#   - aws_ecr_repository for_each over toset(var.repository_names):
#       name                 = "${var.project_name}-${each.value}"
#       image_tag_mutability = var.image_tag_mutability
#       image_scanning_configuration { scan_on_push = var.scan_on_push }
#   - (recommended) aws_ecr_lifecycle_policy to expire old untagged images so the
#     registry doesn't grow forever.
# =============================================================================

# TODO(student): create the repositories (and a lifecycle policy).
