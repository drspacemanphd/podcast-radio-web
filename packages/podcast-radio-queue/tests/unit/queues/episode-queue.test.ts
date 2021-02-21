import { Episode } from '@drspacemanphd/podcast-radio-model';
import { EpisodeQueue } from '../../../src/queues/episode-queue';

let params: any = null;
const mockBehavior = jest.fn();

jest.mock('aws-sdk', () => ({
  SQS: function () {
    return {
      sendMessage: (args: any) => {
        params = args;
        return {
          promise: mockBehavior
        }
      }
    }
  }
}));

afterEach(() => {
  params = null;
  mockBehavior.mockClear();
});

describe('Episode queue', () => {
  it('can send an episode update', async () => {
    // Setup
    const queue: EpisodeQueue = new EpisodeQueue({ endpoint: 'endpoint', region: 'region', episodeUpdateQueueUrl: 'queue url' });
    const episode: Episode = new Episode(
      '12345', 'EPISODE TITLE', 'EPISODE AUTHOR', 'PODCAST ID', 'PODCAST_TITLE', 'DESCRIPTION', 'AUDIO_URL', 1000, new Date(), 0
    );

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.resolve('MESSAGE CORRECTLY SENT'));
      
    // Test
    const result = await queue.pushEpisodeUpdate(episode);
  
    // Assert
    expect(params).toEqual({
      QueueUrl: 'queue url',
      MessageBody: JSON.stringify(episode)
    });
    expect(mockBehavior).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual('MESSAGE CORRECTLY SENT');
  });

  
  it('can send an episode update with default configs', async () => {
    // Setup
    const queue: EpisodeQueue = new EpisodeQueue({});
    const episode: Episode = new Episode(
      '12345', 'EPISODE TITLE', 'EPISODE AUTHOR', 'PODCAST ID', 'PODCAST_TITLE', 'DESCRIPTION', 'AUDIO_URL', 1000, new Date(), 0
    );

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.resolve('MESSAGE CORRECTLY SENT'));
      
    // Test
    const result = await queue.pushEpisodeUpdate(episode);
  
    // Assert
    expect(params).toEqual({
      MessageBody: JSON.stringify(episode)
    });
    expect(mockBehavior).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual('MESSAGE CORRECTLY SENT');
  });

  it('can throw an error when updating the episode', async () => {
    // Setup
    const queue: EpisodeQueue = new EpisodeQueue({ endpoint: 'endpoint', region: 'region' });
    const episode: Episode = new Episode(
      '12345', 'EPISODE TITLE', 'EPISODE AUTHOR', 'PODCAST ID', 'PODCAST_TITLE', 'DESCRIPTION', 'AUDIO_URL', 1000, new Date(), 0
    );

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.reject(new Error('ERROR THROWN')));
      
    // Test
    try {
      await queue.pushEpisodeUpdate(episode);
    } catch (err) {
      expect(params).toEqual({
        MessageBody: JSON.stringify(episode)
      });
      expect(mockBehavior).toHaveBeenCalledTimes(1);
      expect(err.message).toEqual('ERROR THROWN');
    }
  });
});
