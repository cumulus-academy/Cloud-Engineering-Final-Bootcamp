# =============================================================================
# MODULE: rds (PostgreSQL)  —  YOU BUILD THIS  (Milestone 3)
# =============================================================================
# Goal: a private PostgreSQL instance whose master password is generated and
# stored in AWS Secrets Manager (never in plaintext, never in state you read).
#
# WHAT TO CREATE:
#   - aws_db_subnet_group over var.private_subnet_ids
#   - aws_security_group allowing TCP 5432 ONLY from var.allowed_security_group_ids
#   - aws_db_instance:
#       engine               = "postgres"
#       engine_version       = var.engine_version
#       instance_class       = var.db_instance_class
#       allocated_storage    = var.allocated_storage
#       db_name              = var.db_name
#       username             = var.db_username
#       manage_master_user_password = true     # <-- RDS stores it in Secrets Manager
#       publicly_accessible  = false
#       multi_az             = var.multi_az
#       skip_final_snapshot  = true            # ok for a student project
#       storage_encrypted    = true
#
# `manage_master_user_password = true` makes RDS create a Secrets Manager secret
# automatically. Expose its ARN via outputs (see master_user_secret).
#
# AFTER APPLY: run database/schema/001_init.sql and your seed.sql against the
# endpoint, and have the backend read the credentials from Secrets Manager.
# =============================================================================

# TODO(student): create the subnet group, security group, and db instance.
