import { Podcast } from "@drspacemanphd/podcast-radio-model";
import { DynamoDB } from "aws-sdk";

export function itemToPodcast(item: DynamoDB.DocumentClient.AttributeMap): Podcast {
  return new Podcast(
    item['GUID']['S'], item['TITLE']['S'], item['AUTHOR']['S'],item['DESCRIPTION']['S'],
    [], item['IMAGE_URL']['S'], [], []
  );
}