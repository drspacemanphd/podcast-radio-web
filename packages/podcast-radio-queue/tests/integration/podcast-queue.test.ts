import { SQS, AWSError } from 'aws-sdk';
import { Message, ReceiveMessageResult } from 'aws-sdk/clients/sqs';
import { PromiseResult } from 'aws-sdk/lib/request';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { PodcastQueue } from '../../src/queues/podcast-queue';

describe('Podcast Update Queue', () => {
  it('should handle pushing of podcasts to a queue', async () => {
    // Setup
    const podcastOne: Podcast = new Podcast('12345', 'TITLE 1', 'AUTHOR 1', 'DESCRIPTION 1', ['CATEGORY 1']);
    const podcastTwo: Podcast = new Podcast('23456', 'TITLE 2', 'AUTHOR 2', 'DESCRIPTION 2', ['CATEGORY 2']);
    const podcastThree: Podcast = new Podcast('34567', 'TITLE 3', 'AUTHOR 3', 'DESCRIPTION 3', ['CATEGORY 3']);
    const podcastFour: Podcast = new Podcast('45678', 'TITLE 4', 'AUTHOR 4', 'DESCRIPTION 4', ['CATEGORY 4']);
    const podcastFive: Podcast = new Podcast('56789', 'TITLE 5', 'AUTHOR 5', 'DESCRIPTION 5', ['CATEGORY 5']);
    const podcastSix: Podcast = new Podcast('67890', 'TITLE 6', 'AUTHOR 6', 'DESCRIPTION 6', ['CATEGORY 6']);

    const podcastsToSend: Podcast[] = [
      podcastOne,
      podcastTwo,
      podcastThree,
      podcastFour,
      podcastFive,
      podcastSix
    ];
  
    const podcastQueue = new PodcastQueue({
      endpoint: process.env.SQS_ENDPOINT,
      region: process.env.SQS_REGION,
      podcastUpdateQueueUrl: process.env.PODCAST_UPDATE_QUEUE_URL
    });

    const sqs = new SQS({ endpoint: process.env.SQS_ENDPOINT, region: process.env.SQS_REGION });

    const expectedPodcasts = [podcastOne, podcastTwo, podcastThree, podcastFour, podcastFive, podcastSix];

    // Test
    // 1. Send messages
    const messagesToSend: Promise<any>[] = podcastsToSend.map((podcast: Podcast) => podcastQueue.pushPodcastUpdate(podcast)); 
    await Promise.all(messagesToSend);

    // 2. Use client to poll and receive messages
    const receivedMessagesPromiseOne: Promise<PromiseResult<SQS.ReceiveMessageResult, AWSError>>[] = podcastsToSend.map(() => sqs.receiveMessage({
      QueueUrl: process.env.PODCAST_UPDATE_QUEUE_URL,
    }).promise());
  
    const receivedMessagesOne: ReceiveMessageResult[] = await Promise.all(receivedMessagesPromiseOne);
    const receivedPodcastsOne: Podcast[] = receivedMessagesOne.reduce((arr: Podcast[], res: ReceiveMessageResult) => {
      const podcasts: Podcast[] = res.Messages ? res.Messages.map((msg: Message) => JSON.parse(msg.Body) as Podcast): [];
      arr = arr.concat(podcasts);
      return arr;
    }, []).sort((pOne: Podcast, pTwo: Podcast) => pOne.guid.localeCompare(pTwo.guid));

    // 3. Use client to poll and receive massages again -> should all be invisible
    const receivedMessagesPromiseTwo: Promise<PromiseResult<SQS.ReceiveMessageResult, AWSError>>[] = podcastsToSend.map(() => sqs.receiveMessage({
      QueueUrl: process.env.PODCAST_UPDATE_QUEUE_URL,
    }).promise());
  
    const receivedMessagesTwo: ReceiveMessageResult[] = await Promise.all(receivedMessagesPromiseTwo);
    const receivedPodcastsTwo: Podcast[] = receivedMessagesTwo.reduce((arr: Podcast[], res: ReceiveMessageResult) => {
      const podcasts: Podcast[] = res.Messages ? res.Messages.map((msg: Message) => JSON.parse(msg.Body) as Podcast) : [];
      arr = arr.concat(podcasts);
      return arr;
    }, []).sort((pOne: Podcast, pTwo: Podcast) => pOne.guid.localeCompare(pTwo.guid));

    // Assert
    expect(expectedPodcasts).toEqual(receivedPodcastsOne);
    expect([]).toEqual(receivedPodcastsTwo);
  });
});