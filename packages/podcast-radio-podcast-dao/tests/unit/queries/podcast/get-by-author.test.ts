import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { getQuery as getByAuthor } from '../../../../src/queries/podcast/get-by-author';

describe('Query', () => {
  test('is correct', () => {
    // Setup
    const author = 'AUTHOR'

    // Test
    const query: IQuery<DynamoDB.DocumentClient.QueryInput> = getByAuthor(author);

    // Assertions
    expect(query.params.TableName).toEqual('PODCAST');
    expect(query.params.KeyConditionExpression).toEqual('AUTHOR = :author');
    expect(query.params.ExpressionAttributeValues).toEqual({ ':author': author });
    expect(query.params.IndexName).toEqual('AUTHOR_TITLE');
  });
});