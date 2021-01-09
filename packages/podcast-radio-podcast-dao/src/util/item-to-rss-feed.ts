import { RssFeed } from "@drspacemanphd/podcast-radio-model";
import { DynamoDB } from "aws-sdk";

export function itemToRssFeed(item: DynamoDB.DocumentClient.AttributeMap): RssFeed {
  return new RssFeed(
    item['GUID'], item['RSS_URL'], item['CRON'], item['NEXT_START']
  );
}