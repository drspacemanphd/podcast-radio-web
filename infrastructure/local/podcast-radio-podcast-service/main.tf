module "podcast_table" {
  source = "../../modules/podcast-table"
}

module "podcast_update_queue" {
  source                      = "../../modules/podcast-update-queue"
  queue_name                  = "podcast-update-queue"
  visibility_timeout_seconds  = 60
  account_id                  = "000000000000"
}

module "podcast_radio_bucket" {
  source = "../../modules/podcast-radio-s3-bucket"
  bucket_name = "podcast-radio-assets-local"
  environment = "local"
}