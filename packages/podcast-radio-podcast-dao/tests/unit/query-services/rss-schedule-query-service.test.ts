import { DynamoDB, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { RssScheduleQueryService } from '../../../src/query-services/rss-schedule-query-service';
import { DynamoDBQueryRunner } from '../../../src/runners/query-runner';

describe('Rss Schedule Query Service', () => {
  test('can get a feed by an id', async () => {
    // Setup
      const expectedResults: unknown = {
      Items: [
        {
          'GUID': '12345',
          'RSS_URL': 'A URL',
          'CRON': 'A CRON',
          'NEXT_START': 1000
        }
      ]
    }
  
    const expectedFeed = new RssSchedule('12345', 'A URL', 'A CRON', 1000);

    const runner = new DynamoDBQueryRunner(null);
    const dao = new RssScheduleQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(expectedResults as PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>));
  
    // Test
    const actualFeed = await dao.getRssScheduleById('12345');

    // Assertions
    expect(expectedFeed).toEqual(actualFeed);
  });

  test('returns undefined if id is not found', async () => {
    // Setup
    const runner = new DynamoDBQueryRunner(null);
    const dao = new RssScheduleQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(undefined));
  
    // Test
    const actualFeed = await dao.getRssScheduleById('12345');

    // Assertions
    expect(actualFeed).toEqual(undefined);
  });

  test('can get a feed by a url', async () => {
    // Setup
    const expectedResults: unknown = {
      Items: [
        {
          'GUID': '12345',
          'RSS_URL': 'A URL',
          'CRON': 'A CRON',
          'NEXT_START': 1000
        }
      ]
    }
  
    const expectedFeed = [new RssSchedule('12345', 'A URL', 'A CRON', 1000)];

    const runner = new DynamoDBQueryRunner(null);
    const dao = new RssScheduleQueryService(runner);
    jest.spyOn(runner, 'run').mockImplementation(() => Promise.resolve(expectedResults as PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>));
  
    // Test
    const actualFeed = await dao.getRssScheduleByUrl('A URL');

    // Assertions
    expect(expectedFeed).toEqual(actualFeed);
  });
});