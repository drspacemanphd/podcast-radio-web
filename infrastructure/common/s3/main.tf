resource "aws_s3_bucket" "podcast-radio-bucket" {
  bucket           = "podcast-radio-bucket-${var.environment}"
  acl              = "authenticated-read"

  versioning {
    enabled        = true
  }

  force_destroy    = true

  tags = {
    application = "podcast-radio-web"
    environment = var.environment
  }
}