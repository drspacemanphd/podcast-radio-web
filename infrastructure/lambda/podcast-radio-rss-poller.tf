data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

resource "aws_iam_role" "podcast_radio_rss_poller" {
  name = "${var.service_name}_execution_role"

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
    service = var.service_name
  }
}

resource "aws_iam_role_policy" "podcast_radio_rss_poller" {
  name = "${var.service_name}_cloudwatch_policy"

  role = aws_iam_role.podcast_radio_rss_poller.id

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

