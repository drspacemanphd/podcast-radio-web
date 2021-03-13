resource "aws_dynamodb_table_item" "podcast_five" {
  table_name    = "PODCAST"
  hash_key      = "GUID"

  item = <<ITEM
{
  "GUID": {"S": "5"},
  "TITLE": {"S": "TITLE ZERO"},
  "AUTHOR": {"S": "AUTHOR ZERO"},
  "DESCRIPTION": {"S": "DESCRIPTION ZERO"},
  "IMAGE_URL": {"S": "IMAGE_ZERO"}
}
ITEM
}

resource "aws_dynamodb_table_item" "podcast_six" {
  table_name    = "PODCAST"
  hash_key      = "GUID"

  item = <<ITEM
{
  "GUID": {"S": "6"},
  "TITLE": {"S": "TITLE ZERO"},
  "AUTHOR": {"S": "AUTHOR ZERO"},
  "DESCRIPTION": {"S": "DESCRIPTION ZERO"},
  "IMAGE_URL": {"S": "IMAGE_ZERO"}
}
ITEM
}
