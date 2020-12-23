import { Episode } from '@drspacemanphd/podcast-radio-model';
import { EpisodeDao } from '../../../src/dao/episode-dao';
import { DynamoDBEpisodeQueryRunner } from '../../../src/query-runner/episode-query-runner';

describe('Episode Dao', () => {
  test('can get a episode by an id', async () => {
    // Setup
    const expectedEpisode = new Episode('12345', 'A_TITLE', 'AN_AUTHOR', 'A PODCAST', 'A PODCAST TITLE', 'A_DESCRIPTION', 'AUDIO URL', 1000, new Date(10000), 3, ['A keyword'], ['a tag']);

    const runner = new DynamoDBEpisodeQueryRunner(null);
    const dao = new EpisodeDao(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve([expectedEpisode]));
  
    // Test
    const actualEpisode = await dao.getById('12345');

    // Assertions
    expect(expectedEpisode).toEqual(actualEpisode);
  });

  test('can get a episode by a podcast id', async () => {
    // Setup
    const expectedEpisodes = [new Episode('12345', 'A_TITLE', 'AN_AUTHOR', 'A PODCAST', 'A PODCAST TITLE', 'A_DESCRIPTION', 'AUDIO URL', 1000, new Date(10000), 3, ['A keyword'], ['a tag'])
  ];
    const runner = new DynamoDBEpisodeQueryRunner(null);
    const dao = new EpisodeDao(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(expectedEpisodes));
  
    // Test
    const actualEpisodes = await dao.getByPodcast('A PODCAST');

    // Assertions
    expect(expectedEpisodes).toEqual(actualEpisodes);
  });
});