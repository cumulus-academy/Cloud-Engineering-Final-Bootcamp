# =============================================================================
# MODULE: dns-certs (Route53 + ACM)  —  YOU BUILD THIS  (Milestone 7)
# =============================================================================
# Goal: a DNS hosted zone (or use an existing one) and an ACM certificate,
# validated via DNS, that the ALB Ingress uses to serve HTTPS.
#
# WHAT TO CREATE:
#   - (optional) aws_route53_zone "this" — only if var.create_hosted_zone.
#       Use a data "aws_route53_zone" lookup instead if the zone already exists.
#       NOTE: a brand-new zone means you must update your domain registrar's
#       nameservers to the ones this zone outputs.
#   - aws_acm_certificate "this":
#       domain_name               = var.domain_name
#       subject_alternative_names = var.subject_alternative_names
#       validation_method         = "DNS"
#   - aws_route53_record for each domain_validation_options (the DNS proof)
#   - aws_acm_certificate_validation "this" (waits until the cert is issued)
#
# LATER (in the dev environment, after your ALB Ingress exists):
#   - an alias A record pointing var.domain_name at the ALB's DNS name.
#
# IMPORTANT: an ACM cert used by an ALB must be in the SAME region as the ALB.
# =============================================================================

# TODO(student): create the zone (optional), certificate, and validation records.
