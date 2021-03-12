import _ from 'lodash';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { PodcastDao } from '@drspacemanphd/podcast-radio-podcast-dao';

export async function handler(event: Record<string, any>): Promise<any> {
  const endpoint: string = getDbEndpoint();
  const podcastDao = new PodcastDao({ endpoint, region: process.env.DYNAMODB_REGION });
  const podcast: Podcast = getPodcastFromEvent(event);
  process.stdout.write(JSON.stringify(podcast));
  const saved = await podcastDao.insertPodcast(podcast);
}

function getPodcastFromEvent(event: Record<string, any>): Podcast {
  const podcastJSON: string = _.get(event, 'Records[0].body', null);
  return podcastJSON ? JSON.parse(podcastJSON) : null;
}

function getDbEndpoint(): string {
  return (process.env.NODE_ENV.toLowerCase() === 'integration') ?
    `http://${process.env.LOCALSTACK_HOSTNAME}:4566` : process.env.DYNAMODB_ENDPOINT;
}