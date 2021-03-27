module "podcast_table" {
  source = "../../modules/podcast-table"
  environment = "integration"
}

module "episode_table" {
  source = "../../modules/episode-table"
  environment = "integration"
}

module "rss_schedule_table" {
  source = "../../modules/rss-schedule-table"
  environment = "integration"
}

data "external" "thirtySecsFromNow" {
  program = ["node", "${path.module}/timestamp.js"]

  query = {
    minsToAdd = "0.5"
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
  thirtySecsFromNow    = data.external.thirtySecsFromNow.result.time
  oneMinFromNow       = data.external.oneMinFromNow.result.time 
  depends_on = [
    module.podcast_table,
    module.episode_table,
    module.rss_schedule_table,
    data.external.thirtySecsFromNow,
    data.external.oneMinFromNow
  ]
}