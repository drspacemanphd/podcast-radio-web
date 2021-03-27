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

  tags = {
    application = "podcast-radio-web"
    environment = var.environment
  }
}
