variable "environment" {
  type        = string
  default     = "dev"
  description = "dev/qa/prod"
}

variable "service_name" {
  type        = string
  description = "name of the lambda function"
}

variable "description" {
  type        = string
  description = "description of the lambda functionality"
}

variable "lambda_code_path" {
  type        = string
  description = "path of the code"
}

variable lambda_variables {
  type        = map
  description = "map of environment variables for lambda to assume"
}
