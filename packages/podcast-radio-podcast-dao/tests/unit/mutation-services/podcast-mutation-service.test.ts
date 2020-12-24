import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { PodcastMutationService } from '../../../src/mutation-services/podcast-mutation-service';
import { DynamoDBPodcastMutationRunner } from '../../../src/mutation-runner/podcast-mutation-runner';

describe('Podcast Mutation Service', () => {
  test('can insert a podcast', async () => {
    // Setup
    const expectedPodcast = new Podcast('12345', 'A_TITLE', 'AN_AUTHOR', 'A_DESCRIPTION', ['A CAT'], 'An image url', ['A keyword'], ['a tag']);
    const runner = new DynamoDBPodcastMutationRunner(null);
    const dao = new PodcastMutationService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(null));
  
    // Test
    const actualPodcast = await dao.insertPodcast(expectedPodcast);

    // Assertions
    expect(expectedPodcast).toEqual(actualPodcast);
  });
});