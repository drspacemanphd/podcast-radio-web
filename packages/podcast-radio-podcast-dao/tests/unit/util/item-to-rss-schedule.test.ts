import { RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { itemToRssSchedule } from '../../../src/util/item-to-rss-schedule';

describe('Item To Rss Schedule function', () => {
  it('can convert a dynamodb item to function', () => {
    // Setup
    const item: any = {
      'GUID': '12345',
      'PODCAST_ID': '23456',
      'RSS_URL': 'A URL',
      'CRON': 'A CRON',
      'NEXT_START': 1000
    }
  
    const expectedFeed = new RssSchedule('12345', '23456', 'A URL', 'A CRON', 1000);
  
    // Test
    const actualFeed = itemToRssSchedule(item);
  
    // Assertions
    expect(expectedFeed).toEqual(actualFeed);
  });
});