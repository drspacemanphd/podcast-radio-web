terraform {
  required_version = ">= 0.14.5"
  backend "s3" {
  bucket = "podcast-radio-web-dev"
    key    = "terraform-state"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}