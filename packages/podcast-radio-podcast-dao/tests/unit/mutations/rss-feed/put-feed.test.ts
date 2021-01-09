import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { RssFeed } from '@drspacemanphd/podcast-radio-model';
import { getMutation as putFeed } from '../../../../src/mutations/rss-feed/put-feed';

describe('Mutation', () => {
  test('is correct', () => {
    // Setup
    const feed = new RssFeed('12345', 'A URL', 'A CRON', 1000);
    const expectedItem: any = {
      'GUID': '12345',
      'RSS_URL': 'A URL',
      'CRON': 'A CRON',
      'NEXT_START': 1000
    }
  
    // Test
    const query: IQuery<DynamoDB.DocumentClient.PutItemInput> = putFeed(feed);

    // Assertions
    expect(query.params.TableName).toEqual('RSS_FEED');
    expect(query.params.Item).toEqual(expectedItem);
  });
});