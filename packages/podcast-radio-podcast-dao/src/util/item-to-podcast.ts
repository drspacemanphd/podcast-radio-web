import { Podcast } from "@drspacemanphd/podcast-radio-model";
import { DynamoDB } from "aws-sdk";

export function itemToPodcast(item: DynamoDB.DocumentClient.AttributeMap): Podcast {
  return new Podcast(
    item['GUID'], item['TITLE'], item['AUTHOR'], item['DESCRIPTION'],
    item['CATEGORIES'], item['IMAGE_URL'], item['KEYWORDS'], item['TAGS']
  );
}
