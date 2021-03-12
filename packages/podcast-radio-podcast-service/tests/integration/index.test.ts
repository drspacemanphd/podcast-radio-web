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
    
    for (let i = 0; i < 5; i++) {
      podcasts.unshift(new Podcast(i.toString(), `TITLE ${i}`, `AUTHOR ${i}`, `DESCRIPTION ${i}`, [`CATEGORY ${i}`]));
    }

    // Test
    const promises: Promise<any>[] = podcasts.map(p => queue.pushPodcastUpdate(p));
    const results = await Promise.all(promises);

    await sleep(20000);

    // Assert
    const pZero = await dao.getPodcastById('0');
    const pOne = await dao.getPodcastById('1');
    const pTwo = await dao.getPodcastById('2');
    const pThree = await dao.getPodcastById('3');
    const pFour = await dao.getPodcastById('4');
    const pFive = await dao.getPodcastById('5');

    // Expect 5 new podcasts to be created
    expect(pZero).toBeTruthy();
    expect(pZero.guid).toEqual('0');
    expect(pOne).toBeTruthy();
    expect(pOne.guid).toEqual('1');
    expect(pTwo).toBeTruthy();
    expect(pTwo.guid).toEqual('2');
    expect(pThree).toBeTruthy();
    expect(pThree.guid).toEqual('3');
    expect(pFour).toBeTruthy();
    expect(pFour.guid).toEqual('4');

    // Check that one that should not exist indeed does not
    expect(pFive).toBeFalsy();
  });
});

async function sleep(ms: number) {
  return new Promise((resolve, _reject) => {
    return setTimeout(resolve, ms);
  });
}