variable bucket_name {
  type        = string
  description = "Bucket name"
}

variable environment {
  type        = string
  default     = "dev"
  description = "dev/qa/prod"
}