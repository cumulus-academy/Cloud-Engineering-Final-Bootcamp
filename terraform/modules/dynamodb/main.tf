# =============================================================================
# MODULE: dynamodb (visitor counter table)  —  YOU BUILD THIS  (Milestone 3)
# =============================================================================
# Goal: one DynamoDB table the visitor-counter Lambda increments.
# The Lambda expects:  partition key "id" (String), counter attribute "visits".
#
# WHAT TO CREATE:
#   - aws_dynamodb_table:
#       name         = var.table_name
#       billing_mode = var.billing_mode
#       hash_key     = var.hash_key
#       attribute { name = var.hash_key  type = "S" }
#   (You only declare the KEY attribute. "visits" is a non-key attribute, so it
#    does NOT go in the table definition — DynamoDB is schemaless for those.)
# =============================================================================

# TODO(student): create the aws_dynamodb_table resource.
