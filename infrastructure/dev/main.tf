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

module "rss_poller_lambda" {
  source            = "../common/lambda_from_s3"
  service_name      = "podcast-radio-rss-poller"
  environment       = "dev"
  description       = "poller for rss feeds"
  filename          = "../../packages/podcast-radio-rss-poller/lambda.zip"
  lambda_variables  = {
    NODE_ENV = "dev"
    DYNAMODB_REGION = "us-east-1"
    SQS_REGION = "us-east-1"
    PODCAST_UPDATE_QUEUE_URL = module.podcast_update_queue.sqs_queue_url
    EPISODE_UPDATE_QUEUE_URL = module.episode_update_queue.sqs_queue_url
  }
}

module "podcast_service_lambda" {
  source            = "../common/lambda_from_s3"
  service_name      = "podcast-radio-podcast-service"
  environment       = "dev"
  description       = "microservice for handling podcast updates and assets"
  filename          = "../../packages/podcast-radio-podcast-service/lambda.zip"
  lambda_variables  = {
    NODE_ENV = "dev"
    DYNAMODB_REGION = "us-east-1"
    SQS_REGION = "us-east-1"
    PODCAST_UPDATE_QUEUE_URL = module.podcast_update_queue.sqs_queue_url
  }
}

resource "aws_lambda_event_source_mapping" "rss_schedule_ttl" {
  event_source_arn  = module.dynamodb_table.dynamodb_rss_schedule_table_stream_arn
  function_name     = module.rss_poller_lambda.lambda_function_arn
  batch_size        = 1
  starting_position = "LATEST"
}