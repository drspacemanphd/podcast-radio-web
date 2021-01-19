import { DynamoDB } from 'aws-sdk';
import { RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { DynamoDBQueryRunner } from '../../../src/runners/query-runner';
import { RssScheduleQueryService } from '../../../src/query-services/rss-schedule-query-service';

describe('Rss Schedule Query Service', () => {
  let client: DynamoDB.DocumentClient;
  let runner;
  let dao: RssScheduleQueryService;

  beforeEach(() => {
    client = new DynamoDB.DocumentClient({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
    runner = new DynamoDBQueryRunner(client);
    dao = new RssScheduleQueryService(runner);
  });

  test('can retrieve a rss feed by id', async () => {
    // Test
    const rssFeedOne: RssSchedule = await dao.getRssScheduleById('12345');
    const rssFeedTwo: RssSchedule = await dao.getRssScheduleById('23456');
    const rssFeedThree: RssSchedule = await dao.getRssScheduleById('34567');
    const rssFeedFour: RssSchedule = await dao.getRssScheduleById('45678');
    const rssFeedFive: RssSchedule = await dao.getRssScheduleById('56789');

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
    const rssFeedsOne: RssSchedule[] = await dao.getRssScheduleByUrl('http://feeds.feedburner.com/pod-save-america');
    const rssFeedsTwo: RssSchedule[] = await dao.getRssScheduleByUrl('http://rss.art19.com/the-daily');
    const rssFeedsThree: RssSchedule[] = await dao.getRssScheduleByUrl('http://rss.art19.com/lovett');

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