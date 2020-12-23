import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { getQuery as getByCategory } from '../../../../src/queries/episode/get-by-category';

describe('Query', () => {
  test('is correct', () => {
    // Setup
    const category = 'Category'

    // Test
    const query: IQuery<DynamoDB.DocumentClient.QueryInput> = getByCategory(category);

    // Assertions
    expect(query.params.TableName).toEqual('EPISODE');
    expect(query.params.KeyConditionExpression).toEqual('CATEGORY = :category');
    expect(query.params.ExpressionAttributeValues).toEqual({ ':category': category });
  });
});