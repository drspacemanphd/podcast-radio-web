import { DynamoDB } from 'aws-sdk';
import { RssFeed } from '@drspacemanphd/podcast-radio-model';
import { DynamoDBQueryRunner } from '../../../src/runners/query-runner';
import { DynamoDBPutRunner } from '../../../src/runners/put-runner';
import { RssFeedMutationService } from '../../../src/mutation-services/rss-feed-mutation-service';
import { RssFeedQueryService } from '../../../src/query-services/rss-feed-query-service';

describe('Rss Feed Mutation Service', () => {
  let client: DynamoDB.DocumentClient;
  let queryRunner;
  let mutationRunner;
  let queryService: RssFeedQueryService;
  let mutationService: RssFeedMutationService;

  beforeEach(() => {
    client = new DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
    queryRunner = new DynamoDBQueryRunner(client);
    mutationRunner = new DynamoDBPutRunner(client);
    queryService = new RssFeedQueryService(queryRunner);
    mutationService = new RssFeedMutationService(mutationRunner);
  });

  test('can insert a podcast', async () => {
    // Setup
    const rssFeed: RssFeed = new RssFeed('56789', 'http://feeds.feedburner.com/lovett-or-leave-it', '*/10 * * * * *', new Date(9000000).getTime());

    // Test
    const rssFeedToSave = await mutationService.insertRssFeed(rssFeed);
    const savedRssFeed = await queryService.getRssFeedById('56789');

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