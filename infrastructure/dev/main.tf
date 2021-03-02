data "aws_caller_identity" "current" {}

module "dynamodb_table" {
  source = "../common/dynamo_db"
}

module "podcast_update_queue" {
  source                      = "../common/sqs"
  queue_name                  = "podcast-update-queue"
  visibility_timeout_seconds  = 60
  account_id                  = data.aws_caller_identity.current.account_id
}

module "episode_update_queue" {
  source                      = "../common/sqs"
  queue_name                  = "episode-update-queue"
  visibility_timeout_seconds  = 60
  account_id                  = data.aws_caller_identity.current.account_id
}

module "lambda_function" {
  source            = "../common/lambda_from_s3"
  service_name      = "podcast-radio-rss-poller-development"
  environment       = "dev"
  description       = "poller for rss feeds"
  filename          = "../../packages/podcast-radio-rss-poller/lambda.zip"
  lambda_variables  = {
    NODE_ENV = "dev"
    PODCAST_UPDATE_QUEUE_URL = module.podcast_update_queue.sqs_queue_url
    EPISODE_UPDATE_QUEUE_URL = module.episode_update_queue.sqs_queue_url
    DYNAMODB_REGION = "us-east-1"
    SQS_REGION = "us-east-1"
  }
}

resource "aws_lambda_event_source_mapping" "rss_schedule_ttl" {
  event_source_arn  = module.dynamodb_table.dynamodb_rss_schedule_table_stream_arn
  function_name     = module.lambda_function.lambda_function_arn
  batch_size        = 1
  starting_position = "LATEST"
}
