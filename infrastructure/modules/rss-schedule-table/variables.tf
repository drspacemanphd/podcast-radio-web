variable "read_capacity" {
  type    = number
  default = 10
}

variable "write_capacity" {
  type    = number
  default = 10
}

variable "environment" {
  type    = string
  default = "dev"
  description = "dev/qa/prod"
}