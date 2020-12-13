import { Episode } from "@drspacemanphd/podcast-radio-model";
import { DynamoDB } from "aws-sdk";

export function itemToEpisode(item: DynamoDB.DocumentClient.AttributeMap): Episode {
  return new Episode(
    item['GUID']['S'], item['TITLE']['S'], item['AUTHOR']['S'], item['PODCAST_ID']['S'],
    item['PODCAST_TITLE']['S'], item['DESCRIPTION']['S'], item['AUDIO_URL']['S'], item['DURATION']['N'],
    new Date(item['PUBLICATION_DATE']['N']), item['PLAY_COUNT']['N'], [], []
  );
}