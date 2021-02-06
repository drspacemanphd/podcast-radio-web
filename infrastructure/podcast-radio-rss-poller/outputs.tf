output "dynamodb_stream_arn" {
  value = module.dynamodb_table.dynamodb_rss_schedule_table_stream_arn
}