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

variable filename {
  type        = string
  default     = ""
  description = "file path for the lambda code zip file"
}

variable lambda_variables {
  type        = map
  description = "map of environment variables for lambda to assume"
}
