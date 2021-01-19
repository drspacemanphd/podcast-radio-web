import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { getQuery as getByUrl } from '../../../../src/queries/rss-schedule/get-by-url';

describe('Query', () => {
  test('is correct', () => {
    // Setup
    const url = 'url'

    // Test
    const query: IQuery<DynamoDB.DocumentClient.QueryInput> = getByUrl(url);

    // Assertions
    expect(query.params.TableName).toEqual('RSS_SCHEDULE');
    expect(query.params.KeyConditionExpression).toEqual('RSS_URL = :url');
    expect(query.params.ExpressionAttributeValues).toEqual({ ':url': url });
  });
});