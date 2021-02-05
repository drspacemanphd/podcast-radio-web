output lambda_execution_role_id {
  value       = "aws_iam_role.lambda_execution_role.id"
  description = "The name of the assumed lambda execution role"
}

output lambda_execution_role_arn {
  value       = "aws_iam_role.lambda_execution_role.arn"
  description = "The arn of the assumed lambda execution role"
}