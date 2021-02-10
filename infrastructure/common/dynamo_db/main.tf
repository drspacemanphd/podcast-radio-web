resource "aws_dynamodb_table" "podcast" {
  name            = "PODCAST"
  billing_mode    = "PROVISIONED"
  read_capacity   = var.read_capacity
  write_capacity  = var.write_capacity
  hash_key        = "GUID"

  attribute {
    name = "GUID"
    type = "S"
  }

  attribute {
    name = "TITLE"
    type = "S"
  }

  attribute {
    name = "AUTHOR"
    type = "S"
  }

  global_secondary_index {
    name              = "TITLE"
    hash_key          = "TITLE"
    read_capacity     = var.read_capacity
    write_capacity    = var.write_capacity
    projection_type   = "ALL"
  }

  global_secondary_index {
    name              = "AUTHOR_TITLE"
    hash_key          = "AUTHOR"
    range_key         = "TITLE"
    read_capacity     = var.read_capacity
    write_capacity    = var.write_capacity
    projection_type   = "ALL"
  }
}

resource "aws_dynamodb_table" "episode" {
  name            = "EPISODE"
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
    name = "PUBLICATION_DATE"
    type = "N"
  }

  global_secondary_index {
    name              = "PODCAST_ID"
    hash_key          = "PODCAST_ID"
    range_key         = "PUBLICATION_DATE"
    read_capacity     = var.read_capacity
    write_capacity    = var.write_capacity
    projection_type   = "ALL"
  }
}

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
}