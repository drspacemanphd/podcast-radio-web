import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { RssFeed } from '@drspacemanphd/podcast-radio-model';

export function getMutation(rssFeed: RssFeed): IQuery<DynamoDB.DocumentClient.PutItemInput> {
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: 'RSS_FEED',
    Item: {
      GUID: rssFeed.guid,
      RSS_URL: rssFeed.url,
      CRON: rssFeed.cronSchedule,
      NEXT_START: rssFeed.nextStartSecs,
    }
  }

  return {
    params
  } as IQuery<DynamoDB.DocumentClient.PutItemInput>
}