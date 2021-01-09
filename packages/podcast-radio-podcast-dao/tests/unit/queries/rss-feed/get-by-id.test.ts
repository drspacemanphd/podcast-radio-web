import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { getQuery as getById } from '../../../../src/queries/rss-feed/get-by-id';

describe('Query', () => {
  test('is correct', () => {
    // Setup
    const id = 'id'

    // Test
    const query: IQuery<DynamoDB.DocumentClient.QueryInput> = getById(id);

    // Assertions
    expect(query.params.TableName).toEqual('RSS_FEED');
    expect(query.params.KeyConditionExpression).toEqual('GUID = :id');
    expect(query.params.ExpressionAttributeValues).toEqual({ ':id': id });
  });
});