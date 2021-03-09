module "dynamodb_table" {
  source = "../../common/dynamo_db"
}

# module "podcast-update-queue" {
#   source                      = "../../common/sqs"
#   queue_name                  = "podcast-update-queue"
#   visibility_timeout_seconds  = 60
#   account_id                  = "000000000000"
# }

# module "dynamodb_fixtures" {
#   source              = "./fixtures/dynamo_db"
#   threeMinsFromNow    = data.external.threeMinsFromNow.result.time
#   oneMinFromNow       = data.external.oneMinFromNow.result.time 
#   depends_on = [
#     module.dynamodb_table,
#     data.external.threeMinsFromNow,
#     data.external.oneMinFromNow
#   ]
# }