import { DynamoDB } from 'aws-sdk';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { DynamoDBPodcastQueryRunner } from '../../../src/query-runner/podcast-query-runner';
import { DynamoDBPodcastMutationRunner } from '../../../src/mutation-runner/podcast-mutation-runner';
import { PodcastMutationService } from '../../../src/mutation-services/podcast-mutation-service';
import { PodcastQueryService } from '../../../src/query-services/podcast-query-service';

describe('Podcast Mutation Service', () => {
  let client: DynamoDB.DocumentClient;
  let queryRunner;
  let mutationRunner;
  let queryService: PodcastQueryService;
  let mutationService: PodcastMutationService;
  const idToSave: string = '34567';

  beforeEach(() => {
    client = new DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
    queryRunner = new DynamoDBPodcastQueryRunner(client);
    mutationRunner = new DynamoDBPodcastMutationRunner(client);
    queryService = new PodcastQueryService(queryRunner);
    mutationService = new PodcastMutationService(mutationRunner);
  });

  test('can insert a podcast', async () => {
    // Setup
    const podcast: Podcast = await queryService.getById('12345');
    podcast.guid = idToSave;

    // Test
    const podcastToSave = await mutationService.insertPodcast(podcast);
    const savedPodcast = await queryService.getById(idToSave);

    // Assertions
    expect(podcastToSave).toBeDefined();
    expect(savedPodcast).toBeDefined();
    expect(podcastToSave).toEqual(savedPodcast);

    // Cleanup
    await client.delete({
      TableName: 'PODCAST',
      Key: {
        GUID: idToSave
      }
    })
  });
});