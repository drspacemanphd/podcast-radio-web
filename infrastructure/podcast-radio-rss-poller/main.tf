module "dynamodb_table" {
  source = "../dynamo_db"
}

data "external" "threeMinsFromNow" {
  program = ["node", "${path.module}/timestamp.js"]

  query = {
    minsToAdd = "3"
  }
}

data "external" "oneMinFromNow" {
  program = ["node", "${path.module}/timestamp.js"]

  query = {
    minsToAdd = "1"
  }
}

module "dynamodb_fixtures" {
  source              = "./fixtures/dynamo_db"
  threeMinsFromNow    = data.external.threeMinsFromNow.result.time
  oneMinFromNow       = data.external.oneMinFromNow.result.time 
  depends_on = [
    module.dynamodb_table,
    data.external.threeMinsFromNow,
    data.external.oneMinFromNow
  ]
}

module "lambda_function" {
  source              = "../lambda"
  environment         = "local"
  service_name        = "podcast-radio-rss-poller"
  lambda_description  = "microservice for polling rss feeds to process any new episodes"
  lambda_code_path    = "../../services/podcast-radio-rss-poller/lambda.zip"
  dynamodb_rss_schedule_table_stream_arn = "${module.dynamodb_table.dynamodb_rss_schedule_table_stream_arn}"
}