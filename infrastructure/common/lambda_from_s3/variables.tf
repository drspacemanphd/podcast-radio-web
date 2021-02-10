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

variable "description" {
  type        = string
  description = "description of the lambda functionality"
}

variable filename {
  type        = string
  default     = ""
  description = "file path for the lambda code zip file"
}

variable s3_bucket {
  type        = string
  default     = ""
  description = "s3 bucket name for the lambda code"
}

variable s3_key {
  type        = string
  default     = ""
  description = "s3 key for the lambda code"
}

variable s3_object_version {
  type        = string
  default     = ""
  description = "s3 object version for the lambda code"
}

variable lambda_variables {
  type        = map
  description = "map of environment variables for lambda to assume"
}
