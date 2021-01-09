import { DynamoDB, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { EpisodeQueryService } from '../../../src/query-services/episode-query-service';
import { DynamoDBQueryRunner } from '../../../src/runners/query-runner';

describe('Episode Query Service', () => {
  test('can get a episode by an id', async () => {
    // Setup
      const expectedResults: unknown = {
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
  
    const expectedEpisode = new Episode('12345', 'A_TITLE', 'AN_AUTHOR', 'A PODCAST', 'A PODCAST TITLE', 'A_DESCRIPTION', 'AUDIO URL', 1000, new Date(10000), 3, ['A keyword'], ['a tag']);

    const runner = new DynamoDBQueryRunner(null);
    const dao = new EpisodeQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(expectedResults as PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>));
  
    // Test
    const actualEpisode = await dao.getEpisodeById('12345');

    // Assertions
    expect(expectedEpisode).toEqual(actualEpisode);
  });

  test('returns undefined if id is not found', async () => {
    // Setup
    const runner = new DynamoDBQueryRunner(null);
    const dao = new EpisodeQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(undefined));
  
    // Test
    const actualEpisode = await dao.getEpisodeById('12345');

    // Assertions
    expect(actualEpisode).toEqual(undefined);
  });

  test('can get a episode by a podcast id', async () => {
    // Setup
    const expectedResults: unknown = {
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

    const expectedEpisodes = [new Episode('12345', 'A_TITLE', 'AN_AUTHOR', 'A PODCAST', 'A PODCAST TITLE', 'A_DESCRIPTION', 'AUDIO URL', 1000, new Date(10000), 3, ['A keyword'], ['a tag'])];
    const runner = new DynamoDBQueryRunner(null);
    const dao = new EpisodeQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(expectedResults as PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>));
  
    // Test
    const actualEpisodes = await dao.getEpisodesByPodcast('A PODCAST');

    // Assertions
    expect(expectedEpisodes).toEqual(actualEpisodes);
  });
});