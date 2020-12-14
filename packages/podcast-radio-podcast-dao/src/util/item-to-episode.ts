import { Episode } from "@drspacemanphd/podcast-radio-model";
import { DynamoDB } from "aws-sdk";

export function itemToEpisode(item: DynamoDB.DocumentClient.AttributeMap): Episode {
  return new Episode(
    item['GUID'], item['TITLE'], item['AUTHOR'], item['PODCAST_ID'],
    item['PODCAST_TITLE'], item['DESCRIPTION'], item['AUDIO_URL'], item['DURATION'],
    new Date(item['PUBLICATION_DATE']), item['PLAY_COUNT'], item['KEYWORDS'], item['TAGS']
  );
}