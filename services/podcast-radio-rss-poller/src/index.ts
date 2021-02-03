import _ from 'lodash';
import { URL } from 'url';
import { Episode, RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { RssScraper } from '@drspacemanphd/podcast-radio-scrapers';
import { PodcastDao, itemToRssSchedule } from '@drspacemanphd/podcast-radio-podcast-dao';

export async function handler(event: Record<string, any>): Promise<any> {
  try {
    const schedule: RssSchedule = _getValidRssSchedule(event);
    if (!schedule) return;
  
    const { podcast, episodes } = await RssScraper.scrape(new URL(schedule.url));
    const savedEpisodes: Episode[] = await _getSavedEpisodes(schedule.podcastId);
    const newEpisodes = _getNewEpisodes(episodes, savedEpisodes);
    console.log(newEpisodes);
    return newEpisodes;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

function _getNewEpisodes(episodesFromFeed: Episode[], episodesFromDao: Episode[]) {
  const daoEpisodeTitles = episodesFromDao.map(episode => episode.title);
  return episodesFromFeed.filter(episode => daoEpisodeTitles.includes(episode.title));
}

async function _getSavedEpisodes(podcastId: string) {
  const dao = new PodcastDao({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
  return await dao.getEpisodesByPodcast(podcastId);
}

function _getValidRssSchedule(event: Record<string, any>): RssSchedule {
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

  return itemToRssSchedule(_.get(record, 'dynamodb.OldImage'));
}
