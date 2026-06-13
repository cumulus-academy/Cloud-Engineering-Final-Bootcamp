# =============================================================================
# Remote state backend  —  YOU COMPLETE THIS (Milestone 2)
# =============================================================================
# By default Terraform stores state in a local file (terraform.tfstate). That's
# fine for your very first `init`, but a real project keeps state in S3 with a
# DynamoDB lock table so it's durable and safe for CI/CD.
#
# STEP 1 — Create the backend resources ONCE (they can't be managed by the same
#          state they store). Replace the bucket name with a globally-unique one:
#
#   aws s3api create-bucket --bucket <PROJECT_NAME>-tfstate-<ACCOUNT_ID> \
#     --region <AWS_REGION> \
#     --create-bucket-configuration LocationConstraint=<AWS_REGION>
#   aws s3api put-bucket-versioning --bucket <PROJECT_NAME>-tfstate-<ACCOUNT_ID> \
#     --versioning-configuration Status=Enabled
#   aws dynamodb create-table --table-name <PROJECT_NAME>-tflock \
#     --attribute-definitions AttributeName=LockID,AttributeType=S \
#     --key-schema AttributeName=LockID,KeyType=HASH \
#     --billing-mode PAY_PER_REQUEST --region <AWS_REGION>
#
# STEP 2 — Uncomment and fill in the block below, then run:
#   terraform init -migrate-state
#
# TODO(student): uncomment and complete.
# -----------------------------------------------------------------------------
# terraform {
#   backend "s3" {
#     bucket         = "<PROJECT_NAME>-tfstate-<ACCOUNT_ID>"
#     key            = "dev/terraform.tfstate"
#     region         = "<AWS_REGION>"
#     dynamodb_table = "<PROJECT_NAME>-tflock"
#     encrypt        = true
#   }
# }
