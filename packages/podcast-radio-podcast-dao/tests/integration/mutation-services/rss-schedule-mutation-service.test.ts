import { DynamoDB } from 'aws-sdk';
import { RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { DynamoDBQueryRunner } from '../../../src/runners/query-runner';
import { DynamoDBPutRunner } from '../../../src/runners/put-runner';
import { RssScheduleMutationService } from '../../../src/mutation-services/rss-schedule-mutation-service';
import { RssScheduleQueryService } from '../../../src/query-services/rss-schedule-query-service';

describe('Rss Schedule Mutation Service', () => {
  let client: DynamoDB.DocumentClient;
  let queryRunner;
  let mutationRunner;
  let queryService: RssScheduleQueryService;
  let mutationService: RssScheduleMutationService;

  beforeEach(() => {
    client = new DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
    queryRunner = new DynamoDBQueryRunner(client);
    mutationRunner = new DynamoDBPutRunner(client);
    queryService = new RssScheduleQueryService(queryRunner);
    mutationService = new RssScheduleMutationService(mutationRunner);
  });

  test('can insert a podcast', async () => {
    // Setup
    const rssFeed: RssSchedule = new RssSchedule('56789', 'http://feeds.feedburner.com/lovett-or-leave-it', '*/10 * * * * *', new Date(9000000).getTime());

    // Test
    const rssFeedToSave = await mutationService.insertRssSchedule(rssFeed);
    const savedRssFeed = await queryService.getRssScheduleById('56789');

    // Assertions
    expect(rssFeedToSave).toBeDefined();
    expect(savedRssFeed).toBeDefined();
    expect(rssFeedToSave).toEqual(savedRssFeed);

    // Cleanup
    await client.delete({
      TableName: 'PODCAST',
      Key: {
        GUID: '56789'
      }
    });
  });
});