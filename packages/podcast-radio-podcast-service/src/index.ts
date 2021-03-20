import _ from 'lodash';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { PodcastDao as PodcastDBDao } from '@drspacemanphd/podcast-radio-podcast-dao';
// import { PodcastDao as PodcastAssetDao } from '@drspacemanphd/podcast-radio-asset-dao';

export async function handler(event: Record<string, any>): Promise<any> {
  const endpoint: string = getDbEndpoint();
  const podcastDBDao = new PodcastDBDao({ endpoint, region: process.env.DYNAMODB_REGION });
  // const podcastAssetDao = new PodcastAssetDao({ endpoint, region: process.env.S3_REGION });

  const podcast: Podcast = getPodcastFromEvent(event);
  
  // const key: string = podcastAssetDao.updatePodcastImageFromUrl(podcast.guid, podcast.image);
  // podcast.image = key;
  const saved = await podcastDBDao.insertPodcast(podcast);
  console.log(`SAVED THE FOLLOWING PODCAST ${JSON.stringify(saved)}`);
}

function getPodcastFromEvent(event: Record<string, any>): Podcast {
  const podcastJSON: string = _.get(event, 'Records[0].body', null);
  return podcastJSON ? JSON.parse(podcastJSON) : null;
}

function getDbEndpoint(): string {
  return (process.env.NODE_ENV.toLowerCase() === 'integration') ?
    `http://${process.env.LOCALSTACK_HOSTNAME}:4566` : process.env.DYNAMODB_ENDPOINT;
}