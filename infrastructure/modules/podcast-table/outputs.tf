output dynamodb_podcast_table_name {
  value       = aws_dynamodb_table.podcast.id
  description = "The name of the podcast table"
}

output dynamodb_podcast_table_arn {
  value       = aws_dynamodb_table.podcast.arn
  description = "The arn of the podcast table"
}