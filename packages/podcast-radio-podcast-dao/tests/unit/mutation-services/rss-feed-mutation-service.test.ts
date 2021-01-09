import { RssFeed } from '@drspacemanphd/podcast-radio-model';
import { RssFeedMutationService } from '../../../src/mutation-services/rss-feed-mutation-service';
import { DynamoDBPutRunner } from '../../../src/runners/put-runner';

describe('Podcast Mutation Service', () => {
  test('can insert a feed', async () => {
    // Setup
    const expectedFeed = new RssFeed('12345', 'A URL', 'A CRON', 1000);
    const runner = new DynamoDBPutRunner(null);
    const dao = new RssFeedMutationService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(null));
  
    // Test
    const actualFeed = await dao.insertFeed(expectedFeed);

    // Assertions
    expect(expectedFeed).toEqual(actualFeed);
  });
});