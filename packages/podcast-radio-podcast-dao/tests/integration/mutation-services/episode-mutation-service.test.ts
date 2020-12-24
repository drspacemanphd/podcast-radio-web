import { DynamoDB } from 'aws-sdk';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { DynamoDBEpisodeQueryRunner } from '../../../src/query-runner/episode-query-runner';
import { DynamoDBEpisodeMutationRunner } from '../../../src/mutation-runner/episode-mutation-runner';
import { EpisodeMutationService } from '../../../src/mutation-services/episode-mutation-service';
import { EpisodeQueryService } from '../../../src/query-services/episode-query-service';

describe('Episode Mutation Service', () => {
  let client: DynamoDB.DocumentClient;
  let queryRunner;
  let mutationRunner;
  let queryService: EpisodeQueryService;
  let mutationService: EpisodeMutationService;
  const idToSave: string = '34567';

  beforeEach(() => {
    client = new DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
    queryRunner = new DynamoDBEpisodeQueryRunner(client);
    mutationRunner = new DynamoDBEpisodeMutationRunner(client);
    queryService = new EpisodeQueryService(queryRunner);
    mutationService = new EpisodeMutationService(mutationRunner);
  });

  test('can insert an episode', async () => {
    // Setup
    const episode: Episode = await queryService.getById('12345');
    episode.guid = idToSave;

    // Test
    const episodeToSave = await mutationService.insertEpisode(episode);
    const savedEpisode = await queryService.getById(idToSave);

    // Assertions
    expect(episodeToSave).toBeDefined();
    expect(savedEpisode).toBeDefined();
    expect(episodeToSave).toEqual(savedEpisode);

    // Cleanup
    await client.delete({
      TableName: 'EPISODE',
      Key: {
        GUID: idToSave
      }
    });
  });
});