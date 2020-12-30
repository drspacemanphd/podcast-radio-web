import { Episode } from '@drspacemanphd/podcast-radio-model';
import { EpisodeMutationService } from '../../../src/mutation-services/episode-mutation-service';
import { DynamoDBPutRunner } from '../../../src/runners/put-runner';

describe('Episode Mutation Service', () => {
  test('can insert an episode', async () => {
    // Setup
    const expectedEpisode = new Episode('12345', 'A_TITLE', 'AN_AUTHOR', 'A PODCAST', 'A PODCAST TITLE', 'A_DESCRIPTION', 'AUDIO URL', 1000, new Date(10000), 3, ['A keyword'], ['a tag']);

    const runner = new DynamoDBPutRunner(null);
    const dao = new EpisodeMutationService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(null));
  
    // Test
    const actualEpisode = await dao.insertEpisode(expectedEpisode);

    // Assertions
    expect(expectedEpisode).toEqual(actualEpisode);
  });
});