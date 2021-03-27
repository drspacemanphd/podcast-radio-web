resource "aws_dynamodb_table" "rss_schedule" {
  name            = "RSS_SCHEDULE"
  billing_mode    = "PROVISIONED"
  read_capacity   = var.read_capacity
  write_capacity  = var.write_capacity
  hash_key        = "GUID"

  attribute {
    name = "GUID"
    type = "S"
  }

  attribute {
    name = "PODCAST_ID"
    type = "S"
  }

  attribute {
    name = "RSS_URL"
    type = "S"
  }

  attribute {
    name = "NEXT_START"
    type = "N"
  }

  stream_enabled = true
  stream_view_type = "OLD_IMAGE"

  ttl {
    attribute_name  = "NEXT_START"
    enabled         = true
  }

  global_secondary_index {
    name              = "RSS_URL"
    hash_key          = "RSS_URL"
    range_key         = "NEXT_START"
    read_capacity     = var.read_capacity
    write_capacity    = var.write_capacity
    projection_type   = "ALL"
  }

  global_secondary_index {
    name              = "PODCAST_ID"
    hash_key          = "PODCAST_ID"
    range_key         = "NEXT_START"
    read_capacity     = var.read_capacity
    write_capacity    = var.write_capacity
    projection_type   = "ALL"
  }

  tags = {
    application = "podcast-radio-web"
    environment = var.environment
  }
}