output dynamodb_episode_table_name {
  value       = aws_dynamodb_table.episode.id
  description = "The name of the episode table"
}

output dynamodb_episode_table_arn {
  value       = aws_dynamodb_table.episode.arn
  description = "The arn of the episode table"
}