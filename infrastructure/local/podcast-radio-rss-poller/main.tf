module "podcast_table" {
  source = "../../modules/podcast-table"
  environment = "local"
}

module "episode_table" {
  source = "../../modules/episode-table"
  environment = "local"
}

module "rss_schedule_table" {
  source = "../../modules/rss-schedule-table"
  environment = "local"
}

module "podcast-update-queue" {
  source                      = "../../modules/podcast-update-queue"
  queue_name                  = "podcast-update-queue"
  visibility_timeout_seconds  = 60
  account_id                  = "000000000000"
}

module "episode-update-queue" {
  source                      = "../../modules/episode-update-queue"
  queue_name                  = "episode-update-queue"
  visibility_timeout_seconds  = 60
  account_id                  = "000000000000"
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
    module.podcast_table,
    module.episode_table,
    module.rss_schedule_table,
    data.external.threeMinsFromNow,
    data.external.oneMinFromNow
  ]
}