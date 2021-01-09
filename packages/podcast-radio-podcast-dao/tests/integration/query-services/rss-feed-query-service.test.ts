import { DynamoDB } from 'aws-sdk';
import { RssFeed } from '@drspacemanphd/podcast-radio-model';
import { DynamoDBQueryRunner } from '../../../src/runners/query-runner';
import { RssFeedQueryService } from '../../../src/query-services/rss-feed-query-service';

describe('RssFeed Query Service', () => {
  let client: DynamoDB.DocumentClient;
  let runner;
  let dao: RssFeedQueryService;

  beforeEach(() => {
    client = new DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
    runner = new DynamoDBQueryRunner(client);
    dao = new RssFeedQueryService(runner);
  });

  test('can retrieve a rss feed by id', async () => {
    // Test
    const rssFeedOne: RssFeed = await dao.getRssFeedById('12345');
    const rssFeedTwo: RssFeed = await dao.getRssFeedById('23456');
    const rssFeedThree: RssFeed = await dao.getRssFeedById('34567');
    const rssFeedFour: RssFeed = await dao.getRssFeedById('45678');
    const rssFeedFive: RssFeed = await dao.getRssFeedById('56789');

    // Assertions
    expect(rssFeedOne).toBeDefined();
    expect(rssFeedOne.url).toEqual('http://feeds.feedburner.com/pod-save-america');
    expect(rssFeedOne.cronSchedule).toEqual('*/15 * * * *');
    expect(rssFeedOne.nextStartSecs).toBeDefined();

    expect(rssFeedTwo).toBeDefined();
    expect(rssFeedTwo.url).toEqual('http://feeds.feedburner.com/pod-save-america');
    expect(rssFeedTwo.cronSchedule).toEqual('*/15 * * * *');
    expect(rssFeedTwo.nextStartSecs).toBeDefined();

    expect(rssFeedThree).toBeDefined();
    expect(rssFeedThree.url).toEqual('http://rss.art19.com/the-daily');
    expect(rssFeedThree.cronSchedule).toEqual('*/5 * * * *');
    expect(rssFeedThree.nextStartSecs).toBeDefined();

    expect(rssFeedFour).toBeDefined();
    expect(rssFeedFour.url).toEqual('http://rss.art19.com/the-daily');
    expect(rssFeedFour.cronSchedule).toEqual('*/5 * * * *');
    expect(rssFeedFour.nextStartSecs).toBeDefined();

    expect(rssFeedFive).toBeUndefined();
  });

  test('can retrieve rss feeds by url', async () => {
    // Test
    const rssFeedsOne: RssFeed[] = await dao.getRssFeedByUrl('http://feeds.feedburner.com/pod-save-america');
    const rssFeedsTwo: RssFeed[] = await dao.getRssFeedByUrl('http://rss.art19.com/the-daily');
    const rssFeedsThree: RssFeed[] = await dao.getRssFeedByUrl('http://rss.art19.com/lovett');

    // Assertions
    expect(rssFeedsOne).toBeDefined();
    expect(rssFeedsOne).toHaveLength(2);
    expect(rssFeedsOne[0].guid).toEqual('23456');
    expect(rssFeedsOne[1].guid).toEqual('12345');

    expect(rssFeedsTwo).toBeDefined();
    expect(rssFeedsTwo).toHaveLength(2);
    expect(rssFeedsTwo[0].guid).toEqual('45678');
    expect(rssFeedsTwo[1].guid).toEqual('34567');

    expect(rssFeedsThree).toBeDefined();
    expect(rssFeedsThree).toEqual([]);
  });
});