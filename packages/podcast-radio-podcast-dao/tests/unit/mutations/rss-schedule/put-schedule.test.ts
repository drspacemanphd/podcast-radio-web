import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { getMutation as putSchedule } from '../../../../src/mutations/rss-schedule/put-schedule';

describe('Mutation', () => {
  test('is correct', () => {
    // Setup
    const feed = new RssSchedule('12345', '23456', 'A URL', 'A CRON', 1000);
    const expectedItem: any = {
      'GUID': '12345',
      'PODCAST_ID': '23456',
      'RSS_URL': 'A URL',
      'CRON': 'A CRON',
      'NEXT_START': 1000
    }
  
    // Test
    const query: IQuery<DynamoDB.DocumentClient.PutItemInput> = putSchedule(feed);

    // Assertions
    expect(query.params.TableName).toEqual('RSS_SCHEDULE');
    expect(query.params.Item).toEqual(expectedItem);
  });
});