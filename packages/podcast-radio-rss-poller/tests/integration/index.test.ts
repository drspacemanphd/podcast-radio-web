import { SQS } from 'aws-sdk';
import { ReceiveMessageResult } from 'aws-sdk/clients/sqs';
import { URL } from 'url';
import { Podcast, Episode, RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { PodcastDao, RssScheduleDao } from '@drspacemanphd/podcast-radio-podcast-dao';
import { RssScraper } from '@drspacemanphd/podcast-radio-scrapers';
import { startScanner as startDeleteScanner } from './delete';

const podcastDao: PodcastDao = new PodcastDao({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
const rssDao: RssScheduleDao = new RssScheduleDao({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
const sqs = new SQS({ endpoint: process.env.SQS_ENDPOINT, region: process.env.SQS_REGION });

describe('Rss Poller', () => {
  let theDailyPodcast: Podcast;
  let theDailyLatestTwoEpisodes: Episode[];

  beforeEach(async () => {
    const theDailyRssFeed = 'http://rss.art19.com/the-daily';

    // Get the latest to ensure we have correct "expected" data
    const { podcast, episodes } = await RssScraper.scrape(new URL(theDailyRssFeed), 2);
    theDailyPodcast = podcast;
    theDailyLatestTwoEpisodes = episodes;

    // Scraped episodes do not have true ids because the rss feeds do not have them
    // Dummy the ids here for testing
    podcast.guid = '1';
    episodes[0].podcastId = '1';
    episodes[1].podcastId = '1';
    episodes[0].guid = '1';
    episodes[1].guid = '2';

    // Save Podcasts and Episodes Fixtures
    await podcastDao.insertPodcast(theDailyPodcast);
    await podcastDao.insertEpisode(theDailyLatestTwoEpisodes[0]);
    await podcastDao.insertEpisode(theDailyLatestTwoEpisodes[1]);

    // Save Rss Schedule Fixtures
    const rssScheduleOne = new RssSchedule('12345', podcast.guid, theDailyRssFeed, '*/15 * * * *', Math.trunc(new Date('December 31, 9999 23:59:59').getTime() / 1000));
    const rssScheduleTwo = new RssSchedule('23456', podcast.guid, theDailyRssFeed, '*/15 * * * *', Math.trunc((new Date().getTime()) / 1000));
    await rssDao.insertRssSchedule(rssScheduleOne);
    await rssDao.insertRssSchedule(rssScheduleTwo);
  });

  test('can successfully poll for a single new episode', async () => {
    // Setup       
    const fiveMinsFromNowSecs: number = Math.trunc((new Date().getTime() + (60 * 1000 * 5)) / 1000);
    const thirtyMinsFromNowSecs: number = Math.trunc((new Date().getTime() + (60 * 1000 * 30)) / 1000);

    // Before execution, assert that correct entries are present
    let dailyEntries: RssSchedule[] = await rssDao.getRssScheduleByUrl('http://rss.art19.com/the-daily');
    expect(dailyEntries).toBeDefined();
    expect(dailyEntries).toHaveLength(2);
    let dailyLastEntry = dailyEntries.filter(r => r.nextStartSecs === 253402300799);
    expect(dailyLastEntry).toBeDefined();
    let dailyEarlyEntry = dailyEntries.filter(r => r.nextStartSecs < fiveMinsFromNowSecs);
    expect(dailyEarlyEntry).toBeDefined();

    // Before execution, assert that nothing exists in queues
    let podcastQueueResult: ReceiveMessageResult = await sqs.receiveMessage({
      QueueUrl: process.env.PODCAST_UPDATE_QUEUE_URL
    }).promise();
    expect(podcastQueueResult.Messages).toBeUndefined();
    let episodeQueueResult: ReceiveMessageResult = await sqs.receiveMessage({
      QueueUrl: process.env.EPISODE_UPDATE_QUEUE_URL
    }).promise();
    expect(episodeQueueResult.Messages).toBeUndefined();

    // Test
    // Start rss schedule entry delete process and wait for lambda execution
    const deleteProcess = await startDeleteScanner();
    await sleep(0.5);
    clearTimeout(deleteProcess);

    // Assert that correct Rss Schedule entries now exist
    dailyEntries = await rssDao.getRssScheduleByUrl('http://rss.art19.com/the-daily');
    expect(dailyEntries).toBeDefined();
    expect(dailyEntries).toHaveLength(2);
    dailyLastEntry = dailyEntries.filter(r => r.nextStartSecs === 253402300799);
    expect(dailyLastEntry).toBeDefined();
    dailyEarlyEntry = dailyEntries.filter(r => r.nextStartSecs < fiveMinsFromNowSecs)
    expect(dailyEarlyEntry).toBeDefined();
    expect(dailyEarlyEntry).toHaveLength(0);
    const newDailyEarlyEntry = dailyEntries.filter(r => r.nextStartSecs < thirtyMinsFromNowSecs);
    expect(newDailyEarlyEntry).toBeDefined();

    // Assert that podcast update was NOT pushed as the podcast should not change
    podcastQueueResult = await sqs.receiveMessage({
      QueueUrl: process.env.PODCAST_UPDATE_QUEUE_URL
    }).promise();
    expect(podcastQueueResult.Messages).toBeUndefined();

    // Assert that correct episodes should be pushed to QUEUE
    episodeQueueResult = await sqs.receiveMessage({
      QueueUrl: process.env.EPISODE_UPDATE_QUEUE_URL,
      MaxNumberOfMessages: 5
    }).promise();
    expect(episodeQueueResult.Messages).toBeDefined();
    expect(episodeQueueResult.Messages).toHaveLength(2);
  });
});

async function sleep(mins: number) {
  return new Promise(resolve => {
    return setTimeout(resolve, 60 * 1000 * mins);
  });
}
