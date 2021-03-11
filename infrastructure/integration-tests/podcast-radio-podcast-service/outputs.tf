output dynamodb_podcast_table_name {
  value       = module.dynamodb_table.dynamodb_podcast_table_name
}

output podcast_update_queue_url {
  value       = module.podcast_update_queue.sqs_queue_url
}