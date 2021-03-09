import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { PodcastDao } from '@drspacemanphd/podcast-radio-podcast-dao';

export async function handler(event: Record<string, any>): Promise<any> {
  const endpoint: string = getDbEndpoint();
  const podcastDao = new PodcastDao({ endpoint, region: process.env.DYNAMODB_REGION });
  const podcast: Podcast = getPodcastFromEvent(event);
}

function getPodcastFromEvent(event: Record<string, any>): Podcast {
  return undefined;
}

function getDbEndpoint(): string {
  return (process.env.NODE_ENV.toLowerCase() === 'integration') ?
    `http://${process.env.LOCALSTACK_HOSTNAME}:4566` : process.env.DYNAMODB_ENDPOINT;
}