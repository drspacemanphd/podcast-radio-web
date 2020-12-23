import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { getQuery as getByPodcast } from '../../../../src/queries/episode/get-by-podcast';

describe('Query', () => {
  test('is correct', () => {
    // Setup
    const id = '123456'

    // Test
    const query: IQuery<DynamoDB.DocumentClient.QueryInput> = getByPodcast(id);

    // Assertions
    expect(query.params.TableName).toEqual('EPISODE');
    expect(query.params.KeyConditionExpression).toEqual('PODCAST_ID = :id');
    expect(query.params.ExpressionAttributeValues).toEqual({ ':id': id });
    expect(query.params.IndexName).toEqual('PODCAST_ID');
  });
});