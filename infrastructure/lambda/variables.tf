variable "environment" {
  type        = string
  default     = "dev"
  description = "dev/qa/prod"
}

variable "service_name" {
  type        = string
  description = "name of the lambda function"
}

variable "lambda_code_path" {
  type        = string
  description = "path of the code from root of repo"
}

variable "lambda_description" {
  type        = string
  description = "description of the lambda functionality"
}

variable "dynamodb_rss_schedule_table_stream_arn" {
  type        = string
  description = "rss ttl event stream"
} 