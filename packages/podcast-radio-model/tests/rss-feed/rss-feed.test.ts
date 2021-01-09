import RssFeed from '../../src/rss-feed/rss-feed';

describe('RssFeed', () => {
  test('can be constructed', () => {
    const rssFeed: RssFeed = new RssFeed(
      'guid',
      'url',
      'cron',
      1000
    );
    expect(rssFeed).toBeDefined();
    expect(rssFeed.guid).toEqual('guid');
    expect(rssFeed.url).toEqual('url');
    expect(rssFeed.cronSchedule).toEqual('cron');
    expect(rssFeed.nextStartSecs).toEqual(1000);
  });
});