import { RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { RssScheduleMutationService } from '../../../src/mutation-services/rss-schedule-mutation-service';
import { DynamoDBPutRunner } from '../../../src/runners/put-runner';

describe('Rss Schedule Mutation Service', () => {
  test('can insert a feed', async () => {
    // Setup
    const expectedSchedule = new RssSchedule('12345', '23456', 'A URL', 'A CRON', 1000);
    const runner = new DynamoDBPutRunner(null);
    const dao = new RssScheduleMutationService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(null));
  
    // Test
    const actualFeed = await dao.insertRssSchedule(expectedSchedule);

    // Assertions
    expect(expectedSchedule).toEqual(actualFeed);
  });
});