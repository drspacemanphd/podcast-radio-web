import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { PodcastQueryService } from '../../../src/query-services/podcast-query-service';
import { DynamoDBPodcastQueryRunner } from '../../../src/query-runner/podcast-query-runner';

describe('Podcast Query Service', () => {
  test('can get a podcast by an id', async () => {
    // Setup
    const expectedPodcast = new Podcast('12345', 'A_TITLE', 'AN_AUTHOR', 'A_DESCRIPTION', ['A CAT'], 'An image url', ['A keyword'], ['a tag']);
    const runner = new DynamoDBPodcastQueryRunner(null);
    const dao = new PodcastQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve([expectedPodcast]));
  
    // Test
    const actualPodcast = await dao.getById('12345');

    // Assertions
    expect(expectedPodcast).toEqual(actualPodcast);
  });

  test('returns undefined if id is not found', async () => {
    // Setup
    const runner = new DynamoDBPodcastQueryRunner(null);
    const dao = new PodcastQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(undefined));
  
    // Test
    const actualPodcast = await dao.getById('12345');

    // Assertions
    expect(actualPodcast).toEqual(undefined);
  });

  test('can get a podcast by an title', async () => {
    // Setup
    const expectedPodcasts = [new Podcast('12345', 'A_TITLE', 'AN_AUTHOR', 'A_DESCRIPTION', ['A CAT'], 'An image url', ['A keyword'], ['a tag'])];
    const runner = new DynamoDBPodcastQueryRunner(null);
    const dao = new PodcastQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(expectedPodcasts));
  
    // Test
    const actualPodcasts = await dao.getByTitle('A_TITLE');

    // Assertions
    expect(expectedPodcasts).toEqual(actualPodcasts);
  });

  test('can get a podcast by an author', async () => {
    // Setup
    const expectedPodcasts = [new Podcast('12345', 'A_TITLE', 'AN_AUTHOR', 'A_DESCRIPTION', ['A CAT'], 'An image url', ['A keyword'], ['a tag'])];
    const runner = new DynamoDBPodcastQueryRunner(null);
    const dao = new PodcastQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(expectedPodcasts));
  
    // Test
    const actualPodcasts = await dao.getByAuthor('AN_AUTHOR');

    // Assertions
    expect(expectedPodcasts).toEqual(actualPodcasts);
  });
});