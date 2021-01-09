import { RssFeed } from '@drspacemanphd/podcast-radio-model';
import { itemToRssFeed } from '../../../src/util/item-to-rss-feed';

describe('Item To Podcast function', () => {
  it('can convert a dynamodb item to function', () => {
    // Setup
    const item: any = {
      'GUID': '12345',
      'RSS_URL': 'A URL',
      'CRON': 'A CRON',
      'NEXT_START': 1000
    }
  
    const expectedFeed = new RssFeed('12345', 'A URL', 'A CRON', 1000);
  
    // Test
    const actualFeed = itemToRssFeed(item);
  
    // Assertions
    expect(expectedFeed).toEqual(actualFeed);
  });
});