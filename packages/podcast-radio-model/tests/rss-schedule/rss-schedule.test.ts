import RssSchedule from '../../src/rss-schedule/rss-schedule';

describe('RssFeed', () => {
  test('can be constructed', () => {
    const rssSchedule: RssSchedule = new RssSchedule(
      'guid',
      'podcastId',
      'url',
      'cron',
      1000
    );
    expect(rssSchedule).toBeDefined();
    expect(rssSchedule.guid).toEqual('guid');
    expect(rssSchedule.podcastId).toEqual('podcastId');
    expect(rssSchedule.url).toEqual('url');
    expect(rssSchedule.cronSchedule).toEqual('cron');
    expect(rssSchedule.nextStartSecs).toEqual(1000);
  });

  test('can be constructed with default nextStart', () => {
    const rssSchedule: RssSchedule = new RssSchedule(
      'guid',
      'podcastId',
      'url',
      'cron'
    );
    expect(rssSchedule).toBeDefined();
    expect(rssSchedule.guid).toEqual('guid');
    expect(rssSchedule.podcastId).toEqual('podcastId');
    expect(rssSchedule.url).toEqual('url');
    expect(rssSchedule.cronSchedule).toEqual('cron');
    expect(rssSchedule.nextStartSecs).toEqual(1609459199);
  });
});