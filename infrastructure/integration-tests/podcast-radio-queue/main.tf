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