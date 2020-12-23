import AWS from 'aws-sdk';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { DynamoDBEpisodeQueryRunner } from '../../../src/query-runner/episode-query-runner';

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

describe('Expected Query Runner', () => {
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
          'PODCAST_ID': 'A PODCAST',
          'PODCAST_TITLE': 'A PODCAST TITLE',
          'DESCRIPTION': 'A_DESCRIPTION',
          'AUDIO_URL': 'AUDIO URL',
          'DURATION': 1000,
          'PUBLICATION_DATE': 10000,
          'PLAY_COUNT': 3,
          'KEYWORDS': ['A keyword'],
          'TAGS': ['a tag']
        }
      ]
    }

    const expectedEpisodes = [
      new Episode('12345', 'A_TITLE', 'AN_AUTHOR', 'A PODCAST', 'A PODCAST TITLE', 'A_DESCRIPTION', 'AUDIO URL', 1000, new Date(10000), 3, ['A keyword'], ['a tag'])
    ];

    const client = new AWS.DynamoDB.DocumentClient();

    const query: IQuery<AWS.DynamoDB.DocumentClient.QueryInput> = {
      params: {
        TableName: 'EPISODE',
        KeyConditionExpression: 'GUID = :guid',
        ExpressionAttributeValues: {
          ':guid': '12345'
        }
      }
    }

    const runner: DynamoDBEpisodeQueryRunner = new DynamoDBEpisodeQueryRunner(client);

    // Tests
    const actualResults: Episode[] = await runner.run(query);

    // Assertions
    expect(expectedEpisodes).toEqual(actualResults);
  });
});