import { SQS } from 'aws-sdk';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { PodcastQueue } from '@drspacemanphd/podcast-radio-queue';
import { PodcastDao } from '@drspacemanphd/podcast-radio-podcast-dao';

describe('A Dummy Test', () => {
  it('can pass', async () => {
    // Setup
    const queue = new PodcastQueue({
      endpoint: process.env.SQS_ENDPOINT,
      region: process.env.SQS_REGION,
      podcastUpdateQueueUrl: process.env.PODCAST_UPDATE_QUEUE_URL
    });
    const dao = new PodcastDao({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
    const podcasts: Podcast[] = [];
    
    for (let i = 0; i < 2; i++) {
      podcasts.unshift(new Podcast(i.toString(), `TITLE ${i}`, `AUTHOR ${i}`, `DESCRIPTION ${i}`, [`CATEGORY ${i}`]));
    }

    // Test
    const promises: Promise<any>[] = podcasts.map(p => queue.pushPodcastUpdate(p));
    const results = await Promise.all(promises);

    await sleep(20000);

    // Assert
    const pOne = await dao.getPodcastById('1');
    expect(pOne).toBeTruthy();
  });
});

async function sleep(ms: number) {
  return new Promise((resolve, _reject) => {
    return setTimeout(resolve, ms);
  });
}