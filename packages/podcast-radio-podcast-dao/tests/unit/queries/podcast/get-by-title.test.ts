import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { getQuery as getByTitle } from '../../../../src/queries/podcast/get-by-title';

describe('Query', () => {
  test('is correct', () => {
    // Setup
    const title = 'TITLE'

    // Test
    const query: IQuery<DynamoDB.DocumentClient.QueryInput> = getByTitle(title);

    // Assertions
    expect(query.params.TableName).toEqual('PODCAST');
    expect(query.params.KeyConditionExpression).toEqual('TITLE = :title');
    expect(query.params.ExpressionAttributeValues).toEqual({ ':title': title });
    expect(query.params.IndexName).toEqual('TITLE');
  });
});