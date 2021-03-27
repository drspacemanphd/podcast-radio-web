output podcast_radio_bucket_name {
  value       = aws_s3_bucket.podcast-radio-bucket.id
  description = "The name of the podcast radio bucket"
}

output podcast_radio_bucket_arn {
  value       = aws_s3_bucket.podcast-radio-bucket.arn
  description = "The arn of the podcast radio bucket"
}