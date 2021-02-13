import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { RssSchedule } from '@drspacemanphd/podcast-radio-model';

export function getMutation(rssSchedule: RssSchedule): IQuery<DynamoDB.DocumentClient.PutItemInput> {
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: 'RSS_SCHEDULE',
    Item: {
      GUID: rssSchedule.guid,
      PODCAST_ID: rssSchedule.podcastId,
      RSS_URL: rssSchedule.url,
      CRON: rssSchedule.cronSchedule,
      NEXT_START: rssSchedule.nextStartSecs,
    }
  }

  return {
    params
  } as IQuery<DynamoDB.DocumentClient.PutItemInput>
}