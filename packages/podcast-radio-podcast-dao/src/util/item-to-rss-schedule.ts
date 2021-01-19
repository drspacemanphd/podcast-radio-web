import { RssSchedule } from "@drspacemanphd/podcast-radio-model";
import { DynamoDB } from "aws-sdk";

export function itemToRssSchedule(item: DynamoDB.DocumentClient.AttributeMap): RssSchedule {
  return new RssSchedule(
    item['GUID'], item['RSS_URL'], item['CRON'], item['NEXT_START']
  );
}