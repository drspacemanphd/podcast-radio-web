import { DynamoDB } from 'aws-sdk';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { DynamoDBEpisodeQueryRunner } from '../../../src/query-runner/episode-query-runner';
import { EpisodeDao } from '../../../src/dao/episode-dao';

describe('Podcast Dao', () => {
  let client: DynamoDB.DocumentClient;
  let runner;
  let dao: EpisodeDao;

  beforeEach(() => {
    client = new DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
    runner = new DynamoDBEpisodeQueryRunner(client);
    dao = new EpisodeDao(runner);
  });

  test('can retrieve an episode by id', async () => {
    // Test
    const episodeOne: Episode = await dao.getById('12345');
    const episodeTwo: Episode = await dao.getById('23456');
    const episodeThree: Episode = await dao.getById('34567');

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

  test('can retrieve a podcast by title', async () => {
    // Test
    const episodeOne: Episode[] = await dao.getByPodcast('12345');
    const episodeTwo: Episode[] = await dao.getByPodcast('23456');
    const episodeThree: Episode[] = await dao.getByPodcast('34567');

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