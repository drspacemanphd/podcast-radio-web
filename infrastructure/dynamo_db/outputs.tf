output dynamodb_podcast_table_name {
  value       = "aws_dynamodb_table.podcast.id"
  description = "The name of the podcast table"
}

output dynamodb_episode_table_name {
  value       = "aws_dynamodb_table.episode.id"
  description = "The name of the episode table"
}

output dynamodb_rss_schedule_table_name {
  value       = "aws_dynamodb_table.rss_schedule.id"
  description = "The name of the rss schedule table"
}