data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

resource "aws_iam_role" "lambda_execution_role" {
  name = "${var.service_name}_lambda_execution_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": "" 
    }
  ]
}
EOF

  tags = {
    application = "podcast-radio-web"
    environment = var.environment
  }
}

resource "aws_iam_role_policy" "lambda_cloudwatch_policy" {
  name = "${var.service_name}_cloudwatch_policy"

  role = aws_iam_role.lambda_execution_role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "logs:CreateLogGroup",
      "Effect": "Allow",
      "Resource": "arn:aws:logs:${data.aws_region.current}:${data.aws_caller_identity.current.account_id}:*" 
    },
    {
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents
      ]
      "Effect": "Allow",
      "Resource": "arn:aws:logs:${data.aws_region.current}:${data.aws_caller_identity.current.account_id}:log-group:/aws/lambda/${var.service_name}:*" 
    },
  ]
}
EOF

  tags = {
    application = "podcast-radio-web"
    environment = var.environment
    service = var.service_name
  }
}

resource "aws_iam_role_policy_attachment" "additional_policies" {
  for_each    = to_set([
    "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  ])

  role        = aws_iam_role.lambda_execution_role
  policy_arn  = each.value
}
