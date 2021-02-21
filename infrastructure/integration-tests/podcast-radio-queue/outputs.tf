output podcast_update_queue_arn {
  value = module.podcast-update-queue.sqs_queue_arn
}

output podcast_update_queue_url {
  value = module.podcast-update-queue.sqs_queue_url
}

output episode_update_queue_arn {
  value = module.episode-update-queue.sqs_queue_arn
}

output episode_update_queue_url {
  value = module.episode-update-queue.sqs_queue_url
}