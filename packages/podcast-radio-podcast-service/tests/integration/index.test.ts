import { S3 } from 'aws-sdk';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { PodcastQueue } from '@drspacemanphd/podcast-radio-queue';
import { PodcastDao } from '@drspacemanphd/podcast-radio-podcast-dao';

describe('Podcast Radio Podcast Service', () => {
  test('can properly handle podcast updates', async () => {
    // Library Setup
    const queue = new PodcastQueue({
      endpoint: process.env.SQS_ENDPOINT,
      region: process.env.SQS_REGION,
      podcastUpdateQueueUrl: process.env.PODCAST_UPDATE_QUEUE_URL
    });
    const dao = new PodcastDao({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
    const s3 = new S3({ endpoint: process.env.S3_ENDPOINT, region: process.env.S3_REGION, s3ForcePathStyle: true });

    // Setup podcast Updates to push to queue
    // Ensure at least one has valid image
    const podcasts: Podcast[] = [];
    for (let i = 0; i < 7; i++) {
      podcasts.unshift(new Podcast(i.toString(), `TITLE ${i}`, `AUTHOR ${i}`, `DESCRIPTION ${i}`, [`CATEGORY ${i}`]));
    }
    podcasts[0].image = 'https://is3-ssl.mzstatic.com/image/thumb/Music118/v4/cc/96/de/cc96de50-f978-80f6-6be3-26d41369a10b/source/100x100bb.jpg';

    // Test
    const promises: Promise<any>[] = podcasts.map(p => queue.pushPodcastUpdate(p));
    const results = await Promise.all(promises);

    await sleep(30000);

    // Assert
    // Expect 5 new podcasts to be created
    const pZero = await dao.getPodcastById('0');
    const pOne = await dao.getPodcastById('1');
    const pTwo = await dao.getPodcastById('2');
    const pThree = await dao.getPodcastById('3');
    const pFour = await dao.getPodcastById('4');

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

    // Expect 2 podcasts to be updated
    const pFive = await dao.getPodcastById('5');
    expect(pFive).toBeTruthy();
    expect(pFive.guid).toEqual('5');
    expect(pFive.title).toEqual('TITLE 5');
    expect(pFive.author).toEqual('AUTHOR 5');
    expect(pFive.description).toEqual('DESCRIPTION 5');
    expect(pFive.categories).toEqual(['CATEGORY 5']);

    const pSix = await dao.getPodcastById('6');
    expect(pSix).toBeTruthy();
    expect(pSix.guid).toEqual('6');
    expect(pSix.title).toEqual('TITLE 6');
    expect(pSix.author).toEqual('AUTHOR 6');
    expect(pSix.description).toEqual('DESCRIPTION 6');
    expect(pSix.categories).toEqual(['CATEGORY 6']);
    expect(pSix.image).toEqual('6/podcast-image.jpg');

    // Check that podcasts that were not created still don't exist
    const pSeven = await dao.getPodcastById('7');
    expect(pSeven).toBeFalsy();

    // Check that proper image exists
    const img = await s3.headObject(
      {
        Bucket: process.env.PODCAST_RADIO_BUCKET,
        Key: '6/podcast-image.jpg'
      }
    ).promise();

    expect(img.ContentLength).toBeTruthy();
  }, 120000);
});

async function sleep(ms: number) {
  return new Promise((resolve, _reject) => {
    return setTimeout(resolve, ms);
  });
}