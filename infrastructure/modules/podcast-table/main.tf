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

  tags = {
    application = "podcast-radio-web"
    environment = var.environment
  }
}
