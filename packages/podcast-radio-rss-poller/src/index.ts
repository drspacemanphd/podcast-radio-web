import _ from 'lodash';
import { URL } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { parseCronExpression, Cron } from 'cron-schedule';
import { Podcast, Episode, RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { RssScraper } from '@drspacemanphd/podcast-radio-scrapers';
import { PodcastDao, RssScheduleDao } from '@drspacemanphd/podcast-radio-podcast-dao';
import { PodcastQueue, EpisodeQueue } from '@drspacemanphd/podcast-radio-queue';

// Handler
export async function handler(event: Record<string, any>): Promise<any> {
  try {
    const schedule: RssSchedule = _getNextRssSchedule(event);
    if (!schedule || !schedule.url || !schedule.podcastId) return;

    const dbEndpoint = getDbEndpoint();
    const sqsEndpoint = getSqsEndpoint();

    const podcastDao = new PodcastDao({ endpoint: dbEndpoint, region: process.env.DYNAMODB_REGION });
    const rssScheduleDao = new RssScheduleDao({ endpoint: dbEndpoint, region: process.env.DYNAMODB_REGION });
    const podcastQueue = new PodcastQueue({ endpoint: sqsEndpoint, region: process.env.SQS_REGION });
    const episodeQueue = new EpisodeQueue({ endpoint: sqsEndpoint, region: process.env.SQS_REGION });

    console.log(`SAVING NEW SCHEDULE: ${JSON.stringify(schedule)}`);
    await _saveNextRssSchedule(rssScheduleDao, schedule);

    const lookback = process.env.SCRAPE_LOOKBACK ? parseInt( process.env.SCRAPE_LOOKBACK) : 10;
    const { podcast, episodes } = await RssScraper.scrape(new URL(schedule.url), lookback);

    const savedPodcast: Podcast = await _getSavedPodcast(podcastDao, schedule.podcastId);
    const savedEpisodes: Episode[] = await _getSavedEpisodes(podcastDao, schedule.podcastId);

    if (_shouldUpdatePodcast(podcast, savedPodcast)) {
      podcast.guid = savedPodcast.guid;
      await podcastQueue.pushPodcastUpdate(podcast);
    }

    const newEpisodes: Episode[] = _getNewEpisodes(episodes, savedEpisodes);

    const pushedEpisodes: Promise<any>[] = newEpisodes.map((episode: Episode) => episodeQueue.pushEpisodeUpdate(episode));
    await Promise.all(pushedEpisodes);

    console.log(`QUEUED ${newEpisodes.length} EPISODES OF PODCAST ${schedule.podcastId}`);
    return newEpisodes;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

function _getNewEpisodes(episodesFromFeed: Episode[], episodesFromDao: Episode[]) {
  const daoEpisodeTitles = episodesFromDao.map(episode => episode.title);
  return episodesFromFeed.filter(episode => !daoEpisodeTitles.includes(episode.title));
}

async function _getSavedPodcast(podcastDao: PodcastDao, podcastId: string) {
  return await podcastDao.getPodcastById(podcastId);
}

async function _getSavedEpisodes(podcastDao: PodcastDao, podcastId: string) {
  return await podcastDao.getEpisodesByPodcast(podcastId);
}

async function _saveNextRssSchedule(rssDao: RssScheduleDao, schedule: RssSchedule) {
  return await rssDao.insertRssSchedule(schedule);
}

function _getNextRssSchedule(event: Record<string, any>): RssSchedule {
  const record = _.get(event, 'Records[0]', {});
  
  if (record.eventName !== 'REMOVE') {
    console.log(`LOGGED NON-REMOVE ${record.eventName} EVENT`);
    return null;
  }

  const rssUrl = _.get(record, 'dynamodb.OldImage["RSS_URL"]["S"]', null);
  const podcastId = _.get(record, 'dynamodb.OldImage["PODCAST_ID"]["S"]', null);

  if (!rssUrl || !podcastId) {
    console.log(`RECORD WITH RSS_URL ${rssUrl} AND PODCAST_ID ${podcastId} INVALID`);
    return null;
  }

  const cron: string = _.get(record, 'dynamodb.OldImage["CRON"]["S"]', '*/15 * * * *');
  const newNextStart: number = _getNextStart(cron);

  return new RssSchedule(
    uuidv4(),
    podcastId,
    rssUrl,
    cron,
    newNextStart
  );
}

function _getNextStart(cronExpression: string): number {
  const cron: Cron = parseCronExpression(cronExpression);
  const next: Date = cron.getNextDates(2)[1];
  return Math.trunc(next.getTime() / 1000);
}

function _shouldUpdatePodcast(scrapedPodcast: Podcast, savedPodcast: Podcast) {
  const scrapedClone = _.cloneDeep(scrapedPodcast);
  const savedClone = _.cloneDeep(savedPodcast);

  if (!scrapedClone) return false;
  if (!savedClone) return true;

  scrapedClone.guid = savedClone.guid;

  return JSON.stringify(scrapedClone) !== JSON.stringify(savedClone);
}

// Have to use the appropriate localstack hostname when running in tests
function getDbEndpoint(): string {
  return process.env.NODE_ENV.toLowerCase() === 'integration' ?
    `http://${process.env.LOCALSTACK_HOSTNAME}:4566` : process.env.DYNAMODB_ENDPOINT;
}

// Have to use the appropriate localstack hostname when running in tests
function getSqsEndpoint(): string {
  return process.env.NODE_ENV.toLowerCase() === 'integration' ?
    `http://${process.env.LOCALSTACK_HOSTNAME}:4566` : process.env.SQS_ENDPOINT;
}