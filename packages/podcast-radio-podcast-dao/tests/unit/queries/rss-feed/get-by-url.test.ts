import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { getQuery as getByUrl } from '../../../../src/queries/rss-feed/get-by-url';

describe('Query', () => {
  test('is correct', () => {
    // Setup
    const url = 'url'

    // Test
    const query: IQuery<DynamoDB.DocumentClient.QueryInput> = getByUrl(url);

    // Assertions
    expect(query.params.TableName).toEqual('RSS_FEED');
    expect(query.params.KeyConditionExpression).toEqual('RSS_URL = :url');
    expect(query.params.ExpressionAttributeValues).toEqual({ ':url': url });
  });
});