import { AWSError, DynamoDB } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { PodcastQueryService } from '../../../src/query-services/podcast-query-service';
import { DynamoDBQueryRunner } from '../../../src/runners/query-runner';

describe('Podcast Query Service', () => {
  test('can get a podcast by an id', async () => {
    // Setup
    const expectedResults: unknown = {
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

    const expectedPodcast = new Podcast('12345', 'A_TITLE', 'AN_AUTHOR', 'A_DESCRIPTION', ['A CAT'], 'An image url', ['A keyword'], ['a tag']);
    const runner = new DynamoDBQueryRunner(null);
    const dao = new PodcastQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(expectedResults as PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>));
  
    // Test
    const actualPodcast = await dao.getPodcastById('12345');

    // Assertions
    expect(expectedPodcast).toEqual(actualPodcast);
  });

  test('returns undefined if id is not found', async () => {
    // Setup
    const runner = new DynamoDBQueryRunner(null);
    const dao = new PodcastQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(undefined));
  
    // Test
    const actualPodcast = await dao.getPodcastById('12345');

    // Assertions
    expect(actualPodcast).toEqual(undefined);
  });

  test('can get a podcast by an title', async () => {
    // Setup
    const expectedResults: unknown = {
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

    const expectedPodcasts = [new Podcast('12345', 'A_TITLE', 'AN_AUTHOR', 'A_DESCRIPTION', ['A CAT'], 'An image url', ['A keyword'], ['a tag'])];
    const runner = new DynamoDBQueryRunner(null);
    const dao = new PodcastQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(expectedResults as PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>));
  
    // Test
    const actualPodcasts = await dao.getPodcastsByTitle('A_TITLE');

    // Assertions
    expect(expectedPodcasts).toEqual(actualPodcasts);
  });

  test('can get a podcast by an author', async () => {
    // Setup
    const expectedResults: unknown = {
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

    const expectedPodcasts = [new Podcast('12345', 'A_TITLE', 'AN_AUTHOR', 'A_DESCRIPTION', ['A CAT'], 'An image url', ['A keyword'], ['a tag'])];
    const runner = new DynamoDBQueryRunner(null);
    const dao = new PodcastQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(expectedResults as PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>));
  
    // Test
    const actualPodcasts = await dao.getPodcastsByAuthor('AN_AUTHOR');

    // Assertions
    expect(expectedPodcasts).toEqual(actualPodcasts);
  });
});