import _ from 'lodash';
import { URL } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { parseCronExpression, Cron } from 'cron-schedule';
import { Episode, RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { RssScraper } from '@drspacemanphd/podcast-radio-scrapers';
import { PodcastDao, RssScheduleDao } from '@drspacemanphd/podcast-radio-podcast-dao';

export async function handler(event: Record<string, any>): Promise<any> {
  try {
    const schedule: RssSchedule = _getNextRssSchedule(event);
    if (!schedule || !schedule.url || !schedule.podcastId) return;

    const endpoint = getDbEndpoint();

    const podcastDao = new PodcastDao({ endpoint, region: process.env.DYNAMODB_REGION });
    const rssScheduleDao = new RssScheduleDao({ endpoint, region: process.env.DYNAMODB_REGION });

    await _saveNextRssSchedule(rssScheduleDao, schedule);

    const { podcast, episodes } = await RssScraper.scrape(new URL(schedule.url));
    const savedEpisodes: Episode[] = await _getSavedEpisodes(podcastDao, schedule.podcastId);
    const newEpisodes = _getNewEpisodes(episodes, savedEpisodes);
    
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

async function _getSavedEpisodes(podcastDao: PodcastDao, podcastId: string) {
  return await podcastDao.getEpisodesByPodcast(podcastId);
}

async function _saveNextRssSchedule(rssDao: RssScheduleDao, schedule: RssSchedule) {
  return await rssDao.insertRssSchedule(schedule);
}

function _getNextRssSchedule(event: Record<string, any>): RssSchedule {
  const record = _.get(event, 'Records[0]', {});
  
  if (record.eventName !== 'REMOVE') {
    return null;
  }

  const rssUrl = _.get(record, 'dynamodb.OldImage["RSS_URL"]["S"]', null);
  const podcastId = _.get(record, 'dynamodb.OldImage["PODCAST_ID"]["S"]', null);

  if (!rssUrl || !podcastId) {
    console.log(`RECORD WITH RSS_URL ${rssUrl} AND PODCAST_ID ${podcastId} INVALID`);
    return null;
  }

  const cron: string = _.get(record, 'dynamodb.OldImage["CRON"]["S"]', '*/15 * * * *');
  const previousNextStart: number = parseInt(_.get(record, 'dynamodb.OldImage["NEXT_START"]["N"]'));
  const newNextStart: number = _getNextStart(previousNextStart, cron);

  return new RssSchedule(
    uuidv4(),
    podcastId,
    rssUrl,
    cron,
    newNextStart
  );
}

function _getNextStart(previousNextStart: number, cronExpression: string): number {
  const cron: Cron = parseCronExpression(cronExpression);
  const next: Date = cron.getNextDate(new Date(previousNextStart * 1000));
  return Math.trunc(next.getTime() / 1000);
}

// Have to use the appropriate localstack hostname when running in tests
function getDbEndpoint(): string {
  return process.env.NODE_ENV.toLowerCase() === 'integration' ?
    `http://${process.env.LOCALSTACK_HOSTNAME}:4566` : process.env.DYNAMODB_ENDPOINT;
}