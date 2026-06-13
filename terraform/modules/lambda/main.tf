# =============================================================================
# MODULE: lambda (generic Node function)  —  YOU BUILD THIS  (Milestone 6)
# =============================================================================
# Goal: package a function directory into a zip and deploy it with a minimal
# execution role. Used for BOTH the visitor-counter and contact-form functions.
#
# WHAT TO CREATE:
#   - data "archive_file" "zip" {
#       type        = "zip"
#       source_dir  = var.source_dir
#       output_path = "${path.module}/.build/${var.function_name}.zip"
#     }
#     (the archive provider also needs adding to the dev required_providers, or
#      run `npm install` in source_dir first if the function needs node_modules —
#      the visitor-counter does; the contact-form does not.)
#
#   - aws_iam_role "lambda" with the Lambda assume-role trust policy
#   - attach AWSLambdaBasicExecutionRole (CloudWatch Logs)
#   - aws_lambda_function:
#       function_name    = var.function_name
#       runtime          = var.runtime
#       handler          = var.handler
#       filename         = data.archive_file.zip.output_path
#       source_code_hash = data.archive_file.zip.output_base64sha256
#       timeout          = var.timeout
#       environment { variables = var.environment_variables }
#
# LEAST PRIVILEGE: add ONLY the extra permissions a given function needs, e.g.
#   - visitor-counter: dynamodb:UpdateItem on the table ARN
#   - contact-form:    ses:SendEmail / sns:Publish (only if you implement it)
# Attach those as an inline policy or aws_iam_role_policy from the dev wiring.
#
# EXPOSE IT: create API Gateway (aws_apigatewayv2_api / integration / route /
# stage) and an aws_lambda_permission allowing API Gateway to invoke it. You can
# do that here or in the dev environment — your choice.
# =============================================================================

# TODO(student): package the zip, create the role, and create the function.
