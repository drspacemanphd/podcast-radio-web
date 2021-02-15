module "dynamodb_table" {
  source = "../../common/dynamo_db"
}

data "external" "thirtySecsFromNow" {
  program = ["node", "${path.module}/timestamp.js"]

  query = {
    minsToAdd = "3"
  }
}

data "external" "oneMinFromNow" {
  program = ["node", "${path.module}/timestamp.js"]

  query = {
    minsToAdd = "0.5"
  }
}

module "dynamodb_fixtures" {
  source              = "./fixtures/dynamo_db"
  thirtySecsFromNow    = data.external.thirtySecsFromNow.result.time
  oneMinFromNow       = data.external.oneMinFromNow.result.time 
  depends_on = [
    module.dynamodb_table,
    data.external.thirtySecsFromNow,
    data.external.oneMinFromNow
  ]
}

module "lambda_function" {
  source            = "../../common/lambda_from_local"
  service_name      = "podcast-radio-rss-poller"
  environment       = "integration"
  lambda_code_path  = "../../../lambda.zip"
  description       = "poller for rss feeds"
  lambda_variables  = {
    NODE_ENV = "local"
  }
}

resource "aws_lambda_event_source_mapping" "rss_schedule_ttl" {
  event_source_arn  = module.dynamodb_table.dynamodb_rss_schedule_table_stream_arn
  function_name     = module.lambda_function.lambda_function_arn
  batch_size        = 1
}