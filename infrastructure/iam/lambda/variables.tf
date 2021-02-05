variable "environment" {
  type    = string
  default = "dev"
  description = "dev/qa/prod"
}

variable "service_name" {
  type    = string
  description = "name of the lambda function"
}