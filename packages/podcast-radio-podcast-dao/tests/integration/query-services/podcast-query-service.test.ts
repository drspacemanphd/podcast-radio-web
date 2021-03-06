import { DynamoDB } from 'aws-sdk';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { DynamoDBQueryRunner } from '../../../src/runners/query-runner';
import { PodcastQueryService } from '../../../src/query-services/podcast-query-service';

describe('Podcast Query Service', () => {
  let client: DynamoDB.DocumentClient;
  let runner;
  let dao: PodcastQueryService;

  beforeEach(() => {
    client = new DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
    runner = new DynamoDBQueryRunner(client);
    dao = new PodcastQueryService(runner);
  });

  test('can retrieve a podcast by id', async () => {
    // Test
    const podcastOne: Podcast = await dao.getPodcastById('12345');
    const podcastTwo: Podcast = await dao.getPodcastById('23456');
    const podcastThree: Podcast = await dao.getPodcastById('34567');

    // Assertions
    expect(podcastOne).toBeDefined();
    expect(podcastOne.guid).toEqual('12345');
    expect(podcastOne.title).toEqual('The Daily');
    expect(podcastOne.author).toEqual('The New York Times');

    expect(podcastTwo).toBeDefined();
    expect(podcastTwo.guid).toEqual('23456');
    expect(podcastTwo.title).toEqual('Pod Save America');
    expect(podcastTwo.author).toEqual('Crooked Media');

    expect(podcastThree).toBeUndefined();
  });

  test('can retrieve a podcast by title', async () => {
    // Test
    const podcastOne: Podcast[] = await dao.getPodcastsByTitle('The Daily');
    const podcastTwo: Podcast[] = await dao.getPodcastsByTitle('Pod Save America');
    const podcastThree: Podcast[] = await dao.getPodcastsByTitle('Pod Save');

    // Assertions
    expect(podcastOne).toBeDefined();
    expect(podcastOne).toHaveLength(1);
    expect(podcastOne[0].guid).toEqual('12345');
    expect(podcastOne[0].title).toEqual('The Daily');
    expect(podcastOne[0].author).toEqual('The New York Times');

    expect(podcastTwo).toBeDefined();
    expect(podcastTwo).toHaveLength(1);
    expect(podcastTwo[0].guid).toEqual('23456');
    expect(podcastTwo[0].title).toEqual('Pod Save America');
    expect(podcastTwo[0].author).toEqual('Crooked Media');

    expect(podcastThree).toBeDefined();
    expect(podcastThree).toHaveLength(0);
  });

  test('can retrieve a podcast by author', async () => {
    // Test
    const podcastOne: Podcast[] = await dao.getPodcastsByAuthor('The New York Times');
    const podcastTwo: Podcast[] = await dao.getPodcastsByAuthor('Crooked Media');
    const podcastThree: Podcast[] = await dao.getPodcastsByAuthor('Crooked');

    // Assertions
    expect(podcastOne).toBeDefined();
    expect(podcastOne).toHaveLength(1);
    expect(podcastOne[0].guid).toEqual('12345');
    expect(podcastOne[0].title).toEqual('The Daily');
    expect(podcastOne[0].author).toEqual('The New York Times');

    expect(podcastTwo).toBeDefined();
    expect(podcastTwo).toHaveLength(1);
    expect(podcastTwo[0].guid).toEqual('23456');
    expect(podcastTwo[0].title).toEqual('Pod Save America');
    expect(podcastTwo[0].author).toEqual('Crooked Media');

    expect(podcastThree).toBeDefined();
    expect(podcastThree).toHaveLength(0);
  });
});