import { SQS, AWSError } from 'aws-sdk';
import { Message, ReceiveMessageResult } from 'aws-sdk/clients/sqs';
import { PromiseResult } from 'aws-sdk/lib/request';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { EpisodeQueue } from '../../src/queues/episode-queue';

describe('Episode Update Queue', () => {
  it('should handle pushing of episodes to a queue', async () => {
    // Setup
    const episodeOne: Episode = new Episode('12345', 'TITLE 1', 'AUTHOR 1', '12345', 'PODCAST_TITLE 1', 'DESCRIPTION 1', 'AUDIO 1', 1, new Date(1), 1);
    const episodeTwo: Episode = new Episode('23456', 'TITLE 1', 'AUTHOR 1', '12345', 'PODCAST_TITLE 1', 'DESCRIPTION 1', 'AUDIO 1', 1, new Date(1), 1);
    const episodeThree: Episode = new Episode('34567', 'TITLE 1', 'AUTHOR 1', '12345', 'PODCAST_TITLE 1', 'DESCRIPTION 1', 'AUDIO 1', 1, new Date(1), 1);
    const episodeFour: Episode = new Episode('45678', 'TITLE 1', 'AUTHOR 1', '12345', 'PODCAST_TITLE 1', 'DESCRIPTION 1', 'AUDIO 1', 1, new Date(1), 1);
    const episodeFive: Episode = new Episode('56789', 'TITLE 1', 'AUTHOR 1', '12345', 'PODCAST_TITLE 1', 'DESCRIPTION 1', 'AUDIO 1', 1, new Date(1), 1);
    const episodeSix: Episode = new Episode('67890', 'TITLE 1', 'AUTHOR 1', '12345', 'PODCAST_TITLE 1', 'DESCRIPTION 1', 'AUDIO 1', 1, new Date(1), 1);

    const episodesToSend: Episode[] = [
      episodeOne,
      episodeTwo,
      episodeThree,
      episodeFour,
      episodeFive,
      episodeSix
    ];
  
    const episodeQueue = new EpisodeQueue({
      endpoint: process.env.SQS_ENDPOINT,
      region: process.env.SQS_REGION
    });

    const sqs = new SQS({ endpoint: process.env.SQS_ENDPOINT, region: process.env.SQS_REGION });

    const expectedEpisodes = [episodeOne, episodeTwo, episodeThree, episodeFour, episodeFive, episodeSix];

    // Test
    // 1. Send messages
    const messagesToSend: Promise<any>[] = episodesToSend.map((episode: Episode) => episodeQueue.pushEpisodeUpdate(episode)); 
    await Promise.all(messagesToSend);

    // 2. Use client to poll and receive messages
    const receivedMessagesPromiseOne: Promise<PromiseResult<SQS.ReceiveMessageResult, AWSError>>[] = episodesToSend.map(() => sqs.receiveMessage({
      QueueUrl: process.env.EPISODE_UPDATE_QUEUE_URL,
    }).promise());
  
    const receivedMessagesOne: ReceiveMessageResult[] = await Promise.all(receivedMessagesPromiseOne);
    const receivedEpisodesOne: Episode[] = receivedMessagesOne.reduce((arr: Episode[], res: ReceiveMessageResult) => {
      const episodes: Episode[] = res.Messages ? res.Messages.map((msg: Message) => JSON.parse(msg.Body) as Episode): [];
      arr = arr.concat(episodes);
      return arr;
    }, []).sort((eOne: Episode, eTwo: Episode) => eOne.guid.localeCompare(eTwo.guid));

    // 3. Use client to poll and receive massages again -> should all be invisible
    const receivedMessagesPromiseTwo: Promise<PromiseResult<SQS.ReceiveMessageResult, AWSError>>[] = episodesToSend.map(() => sqs.receiveMessage({
      QueueUrl: process.env.EPISODE_UPDATE_QUEUE_URL,
    }).promise());
  
    const receivedMessagesTwo: ReceiveMessageResult[] = await Promise.all(receivedMessagesPromiseTwo);
    const receivedEpisodesTwo: Episode[] = receivedMessagesTwo.reduce((arr: Episode[], res: ReceiveMessageResult) => {
      const episodes: Episode[] = res.Messages ? res.Messages.map((msg: Message) => JSON.parse(msg.Body) as Episode) : [];
      arr = arr.concat(episodes);
      return arr;
    }, []).sort((eOne: Episode, eTwo: Episode) => eOne.guid.localeCompare(eTwo.guid));
  
    // Assert
    expect(JSON.stringify(expectedEpisodes)).toEqual(JSON.stringify(receivedEpisodesOne));
    expect([]).toEqual(receivedEpisodesTwo);
  });
});