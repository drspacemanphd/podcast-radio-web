import _ from 'lodash';
import { URL } from 'url';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { RssScraper } from '@drspacemanphd/podcast-radio-scrapers';
import { PodcastDao } from '@drspacemanphd/podcast-radio-podcast-dao';

export async function handler(event: Record<string, any>): Promise<any> {
  try {
    const schedule = _getValidRssSchedule(event);
    if (!schedule) return;
  
    const { podcast, episodes } = await RssScraper.scrape(new URL(schedule.rssUrl));
  
    const endpoint = `http://${process.env.LOCALSTACK_HOSTNAME}:4566`;
    console.log(`ENDPOINT: ${endpoint}`);
  
    console.log(JSON.stringify(process.env));
  
    const queries: Promise<any>[] = [];
    const dao = new PodcastDao({ endpoint, region: process.env.DYNAMODB_REGION });
  
    console.log('MAKING QUERIES');
    queries.push(dao.getPodcastById(schedule.podcastId));
    queries.push(dao.getEpisodesByPodcast(schedule.podcastId));
    
    const resolvedQueries = await Promise.all(queries);
    const savedEpisodes: string[] = resolvedQueries[1].map((episode: Episode) => episode.title);
  
    const newEpisodes = episodes.filter((episode: Episode) => !savedEpisodes.includes(episode.title));
    console.log(newEpisodes);
    return newEpisodes;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

function _getValidRssSchedule(event: Record<string, any>): Record<string, any> {
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

  return { rssUrl, podcastId };
}
