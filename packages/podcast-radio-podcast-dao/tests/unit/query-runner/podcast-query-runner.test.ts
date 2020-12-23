import AWS from 'aws-sdk';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { DynamoDBPodcastQueryRunner } from '../../../src/query-runner/podcast-query-runner';

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

describe('Podcast Query Runner', () => {
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
          'IMAGE_URL': 'An image url',
          'KEYWORDS': ['A keyword'],
          'TAGS': ['a tag']
        }
      ]
    }

    const expectedPodcasts = [
      new Podcast('12345', 'A_TITLE', 'AN_AUTHOR', 'A_DESCRIPTION', ['A CAT'], 'An image url', ['A keyword'], ['a tag'])
    ];

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

    const runner: DynamoDBPodcastQueryRunner = new DynamoDBPodcastQueryRunner(client);

    // Tests
    const actualResults: Podcast[] = await runner.run(query);

    // Assertions
    expect(expectedPodcasts).toEqual(actualResults);
  });
});