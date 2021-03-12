module "dynamodb_table" {
  source = "../../common/dynamo_db"
}

module "podcast_update_queue" {
  source                      = "../../common/sqs"
  queue_name                  = "podcast-update-queue"
  visibility_timeout_seconds  = 60
  account_id                  = "000000000000"
}

module "lambda_function" {
  source            = "../../common/lambda_from_local"
  service_name      = "podcast-radio-podcast-service"
  environment       = "integration"
  lambda_code_path  = "/tmp/lambda.zip"
  description       = "microservice that updates podcast entries and assets"
  lambda_variables  = {
    NODE_ENV = "integration"
  }
}

# module "lambda_function" {
#   source            = "../../common/lambda_from_s3"
#   service_name      = "podcast-radio-podcast-service"
#   environment       = "integration"
#   description       = "poller for rss feeds"
#   filename          = "../../../tmp/lambda.zip"
#   lambda_variables  = {
#     NODE_ENV = "integration"
#   }
# }


resource "aws_lambda_event_source_mapping" "podcast_update_queue_mapping" {
  event_source_arn  = module.podcast_update_queue.sqs_queue_arn
  function_name     = module.lambda_function.lambda_function_arn
  batch_size        = 1
}