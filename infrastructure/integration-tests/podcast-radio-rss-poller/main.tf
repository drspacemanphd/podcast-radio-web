module "dynamodb_table" {
  source = "../../common/dynamo_db"
}

module "podcast_update_queue" {
  source                      = "../../common/sqs"
  queue_name                  = "podcast-update-queue"
  visibility_timeout_seconds  = 60
  account_id                  = "000000000000"
}

module "episode_update_queue" {
  source                      = "../../common/sqs"
  queue_name                  = "episode-update-queue"
  visibility_timeout_seconds  = 60
  account_id                  = "000000000000"
}

module "lambda_function" {
  source            = "../../common/lambda_from_s3"
  service_name      = "podcast-radio-rss-poller"
  environment       = "integration"
  filename  = "/tmp/lambda.zip"
  description       = "poller for rss feeds"
  lambda_variables  = {
    NODE_ENV = "integration"
  }
}

resource "aws_lambda_event_source_mapping" "rss_schedule_ttl" {
  event_source_arn  = module.dynamodb_table.dynamodb_rss_schedule_table_stream_arn
  function_name     = module.lambda_function.lambda_function_arn
  batch_size        = 1
}