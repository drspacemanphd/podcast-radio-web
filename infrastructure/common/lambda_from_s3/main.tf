resource "aws_iam_role" "lambda_execution_role" {
  name = "${var.service_name}-lambda-execution-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
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
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "additional_policies" {
  for_each    = toset([
    "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess",
    "arn:aws:iam::aws:policy/AmazonS3FullAccess"
  ])

  role        = aws_iam_role.lambda_execution_role.id
  policy_arn  = each.value
}

resource "aws_s3_bucket" "lambda_code_bucket" {
  bucket           = "${var.service_name}-function-code"
  acl              = "authenticated-read"

  versioning {
    enabled        = true
  }

  force_destroy    = true

  tags = {
    application = "podcast-radio-web"
    environment = var.environment
    service = var.service_name
  }
}

resource "aws_s3_bucket_object" "lambda_code" {
  bucket   = "${var.service_name}-function-code"
  key      = var.service_name
  source   = var.filename

  tags = {
    application = "podcast-radio-web"
    environment = var.environment
    service = var.service_name
  }
}

resource "aws_lambda_function" "lambda_function" {
  function_name     = var.service_name
  handler           = "index.handler"
  role              = aws_iam_role.lambda_execution_role.id

  description       = var.description

  filename          = var.filename

  # s3_bucket         = "${var.service_name}-function-code"
  # s3_key            = aws_s3_bucket_object.lambda_code.id
  # s3_object_version = aws_s3_bucket_object.lambda_code.version_id

  s3_bucket         = var.s3_bucket
  s3_key            = var.s3_key
  s3_object_version = var.s3_object_version

  runtime           = "nodejs12.x"
  memory_size       = 512
  timeout           = 30

  environment {
    variables = var.lambda_variables
  }

  tags = {
    application = "podcast-radio-web"
    environment = var.environment
    service = var.service_name
  }
}
