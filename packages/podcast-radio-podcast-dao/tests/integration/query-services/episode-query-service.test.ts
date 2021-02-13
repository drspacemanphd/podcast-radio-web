import { DynamoDB } from 'aws-sdk';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { DynamoDBQueryRunner } from '../../../src/runners/query-runner';
import { EpisodeQueryService } from '../../../src/query-services/episode-query-service';

describe('Episode Query Service', () => {
  let client: DynamoDB.DocumentClient;
  let runner;
  let dao: EpisodeQueryService;

  beforeEach(() => {
    client = new DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
    runner = new DynamoDBQueryRunner(client);
    dao = new EpisodeQueryService(runner);
  });

  test('can retrieve an episode by id', async () => {
  
    // Test
    const episodeOne: Episode = await dao.getEpisodeById('12345');
    const episodeTwo: Episode = await dao.getEpisodeById('23456');
    const episodeThree: Episode = await dao.getEpisodeById('34567');

    // Assertions
    expect(episodeOne).toBeDefined();
    expect(episodeOne.guid).toEqual('12345');
    expect(episodeOne.podcastId).toEqual('12345');
    expect(episodeOne.title).toEqual('A Guide to Georgia\'s Senate Runoffs');
    expect(episodeOne.author).toEqual('The New York Times');

    expect(episodeTwo).toBeDefined();
    expect(episodeTwo.guid).toEqual('23456');
    expect(episodeTwo.podcastId).toEqual('23456');
    expect(episodeTwo.title).toEqual('The Mitch Who Stole Christmas');
    expect(episodeTwo.author).toEqual('Crooked Media');

    expect(episodeThree).toBeUndefined();
  });

  test('can retrieve a episode by title', async () => {
    // Test
    const episodeOne: Episode[] = await dao.getEpisodesByPodcast('12345');
    const episodeTwo: Episode[] = await dao.getEpisodesByPodcast('23456');
    const episodeThree: Episode[] = await dao.getEpisodesByPodcast('34567');

    // Assertions
    expect(episodeOne).toBeDefined();
    expect(episodeOne).toHaveLength(1);
    expect(episodeOne[0].guid).toEqual('12345');
    expect(episodeOne[0].podcastId).toEqual('12345');
    expect(episodeOne[0].title).toEqual('A Guide to Georgia\'s Senate Runoffs');
    expect(episodeOne[0].author).toEqual('The New York Times');

    expect(episodeTwo).toBeDefined();
    expect(episodeTwo).toHaveLength(1);
    expect(episodeTwo[0].guid).toEqual('23456');
    expect(episodeTwo[0].podcastId).toEqual('23456');
    expect(episodeTwo[0].title).toEqual('The Mitch Who Stole Christmas');
    expect(episodeTwo[0].author).toEqual('Crooked Media');

    expect(episodeThree).toBeDefined();
    expect(episodeThree).toHaveLength(0);
  });
});