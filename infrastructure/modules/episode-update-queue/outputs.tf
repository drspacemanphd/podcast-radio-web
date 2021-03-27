output sqs_queue_arn {
  value       = aws_sqs_queue.queue.arn
  description = "The arn of the queue"
}

output sqs_queue_url {
  value       = aws_sqs_queue.queue.id
  description = "The url of the queue"
}