output dynamodb_podcast_table_name {
  value       = module.podcast_table.dynamodb_podcast_table_name
}

output dynamodb_episode_table_name {
  value       = module.episode_table.dynamodb_episode_table_name
}

output dynamodb_rss_schedule_table_name {
  value       = module.rss_schedule_table.dynamodb_rss_schedule_table_name
}

output dynamodb_rss_schedule_table_stream_arn {
  value       = module.rss_schedule_table.dynamodb_rss_schedule_table_stream_arn
}