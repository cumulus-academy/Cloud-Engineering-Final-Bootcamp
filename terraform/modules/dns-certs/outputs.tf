# Uncomment + complete as you build main.tf.

# output "certificate_arn" {
#   description = "Validated ACM certificate ARN for the ALB Ingress"
#   value       = aws_acm_certificate_validation.this.certificate_arn
# }

# output "zone_id" {
#   description = "Route53 hosted zone ID"
#   value       = var.create_hosted_zone ? aws_route53_zone.this[0].zone_id : data.aws_route53_zone.this[0].zone_id
# }

# output "name_servers" {
#   description = "Nameservers to set at your registrar (only if you created the zone)"
#   value       = var.create_hosted_zone ? aws_route53_zone.this[0].name_servers : []
# }
