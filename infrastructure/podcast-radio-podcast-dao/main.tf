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