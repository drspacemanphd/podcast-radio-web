import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { getQuery as getById } from '../../../../src/queries/episode/get-by-id';

describe('Query', () => {
  test('is correct', () => {
    // Setup
    const id = '123456'

    // Test
    const query: IQuery<DynamoDB.DocumentClient.QueryInput> = getById(id);

    // Assertions
    expect(query.params.TableName).toEqual('EPISODE');
    expect(query.params.KeyConditionExpression).toEqual('GUID = :id');
    expect(query.params.ExpressionAttributeValues).toEqual({ ':id': id });
  });
});