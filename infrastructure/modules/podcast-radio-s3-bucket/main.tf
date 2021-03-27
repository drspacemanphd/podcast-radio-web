resource "aws_s3_bucket" "podcast-radio-bucket" {
  bucket           = var.bucket_name
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