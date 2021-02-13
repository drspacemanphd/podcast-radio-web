module "dynamodb_table" {
  source = "../../common/dynamo_db"
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
    module.dynamodb_table,
    data.external.thirtySecsFromNow,
    data.external.oneMinFromNow
  ]
}