output dynamodb_rss_schedule_table_name {
  value       = aws_dynamodb_table.rss_schedule.id
  description = "The name of the rss schedule table"
}

output dynamodb_rss_schedule_table_stream_arn {
  value       = aws_dynamodb_table.rss_schedule.stream_arn
  description = "The stream arn of the rss schedule table"
}