output dynamodb_podcast_table_name {
  value       = module.dynamodb_table.dynamodb_podcast_table_name
}

output podcast_update_queue_url {
  value       = module.podcast_update_queue.sqs_queueurl
}

output podcast_update_queue_arn {
  value       = module.podcast_update_queue.sqs_queue_arn
}

output podcast_radio_bucket_name {
  value       = module.podcast_radio_bucket.podcast_radio_bucket_name
}

output podcast_radio_bucket_arn {
  value       = module.podcast_radio_bucket.podcast_radio_bucket_arn
}

