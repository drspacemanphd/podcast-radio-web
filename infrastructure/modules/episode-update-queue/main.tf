resource "aws_sqs_queue" "queue" {
  name                          = var.queue_name
  visibility_timeout_seconds    = var.visibility_timeout_seconds
  policy                        = <<EOF
{
  "Version": "2008-10-17",
  "Id": "${var.queue_name}-policy-id",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "AWS": "${var.account_id}"
      },
      "Action": [
        "SQS:*"
      ],
      "Resource": "arn:aws:sqs:us-east-1:${var.account_id}:${var.queue_name}"
    }
  ]
}
EOF
}