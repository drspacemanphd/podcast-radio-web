module "podcast_table" {
  source = "../../modules/podcast-table"
  environment = "integration"
}

module "podcast_table_fixtures" {
  source            = "./fixtures/dynamo_db"
  depends_on = [
    module.podcast_table
  ]
}

module "podcast_radio_bucket" {
  source = "../../modules/podcast-radio-s3-bucket"
  bucket_name = "podcast-radio-assets-integration"
  environment = "dev"
}

module "podcast_update_queue" {
  source                      = "../../modules/podcast-update-queue"
  queue_name                  = "podcast-update-queue"
  visibility_timeout_seconds  = 60
  account_id                  = "000000000000"
}

module "lambda_function" {
  source            = "../../modules/podcast-service-lambda"
  service_name      = "podcast-radio-podcast-service"
  environment       = "integration"
  description       = "microservice that handles podcast updates"
  filename          = "/tmp/lambda.zip"
  lambda_variables  = {
    NODE_ENV = "integration"
  }
}

resource "aws_lambda_event_source_mapping" "podcast_update_queue_mapping" {
  event_source_arn  = module.podcast_update_queue.sqs_queue_arn
  function_name     = module.lambda_function.lambda_function_arn
  batch_size        = 1
}