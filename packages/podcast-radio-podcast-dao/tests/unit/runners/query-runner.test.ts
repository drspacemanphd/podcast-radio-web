import AWS from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { DynamoDBQueryRunner } from '../../../src/runners/query-runner';

let expectedResults: AWS.DynamoDB.DocumentClient.QueryOutput;

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: function () {
      return {
        query: () => ({
          promise: jest.fn(() => expectedResults)
        })
      }
    }
  }
}));

describe('Query Runner', () => {
  afterEach(() => {
    expectedResults = undefined;
  });

  test('can execute queries', async () => {
    // Setup
    expectedResults = {
      Items: [
        {
          'GUID': '12345',
          'TITLE': 'A_TITLE',
          'AUTHOR': 'AN_AUTHOR',
          'DESCRIPTION': 'A_DESCRIPTION',
          'CATEGORIES': ['A CAT'],
          'IMAGE': 'An image url',
          'KEYWORDS': ['A keyword'],
          'TAGS': ['a tag']
        }
      ]
    }

    const client = new AWS.DynamoDB.DocumentClient();

    const query: IQuery<AWS.DynamoDB.DocumentClient.QueryInput> = {
      params: {
        TableName: 'PODCAST',
        KeyConditionExpression: 'GUID = :guid',
        ExpressionAttributeValues: {
          ':guid': '12345'
        }
      }
    }

    const runner: DynamoDBQueryRunner = new DynamoDBQueryRunner(client);

    // Tests
    const actualResults: any = await runner.run(query);

    // Assertions
    expect(expectedResults).toEqual(actualResults);
  });
});