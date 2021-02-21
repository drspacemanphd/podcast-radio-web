variable queue_name {
  type        = string
  description = "name for the queue"
}

variable account_id {
  type        = string
  description = "account id to allow access to queue"
}

variable visibility_timeout_seconds {
  type        = number
  description = "seconds during which message is not visible while processing"
}