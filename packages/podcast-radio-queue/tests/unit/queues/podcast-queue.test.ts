import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { PodcastQueue } from '../../../src/queues/podcast-queue';

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

describe('Podcast queue', () => {
  it('can send a podcast update', async () => {
    // Setup
    const queue: PodcastQueue = new PodcastQueue({ endpoint: 'endpoint', region: 'region', podcastUpdateQueueUrl: 'queue url' });
    const podcast: Podcast = new Podcast('12345', 'PODCAST_TITLE', 'AUTHOR', 'DESCRIPTION', ['CATEGORIES'], 'IMAGE_URL');

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.resolve('MESSAGE CORRECTLY SENT'));
      
    // Test
    const result = await queue.pushPodcastUpdate(podcast);
  
    // Assert
    expect(params).toEqual({
      QueueUrl: 'queue url',
      MessageBody: JSON.stringify(podcast)
    });
    expect(mockBehavior).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual('MESSAGE CORRECTLY SENT');
  });

  
  it('can send a podcast update with default configs', async () => {
    // Setup
    const queue: PodcastQueue = new PodcastQueue({});
    const podcast: Podcast = new Podcast('12345', 'PODCAST_TITLE', 'AUTHOR', 'DESCRIPTION', ['CATEGORIES'], 'IMAGE_URL');

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.resolve('MESSAGE CORRECTLY SENT'));
      
    // Test
    const result = await queue.pushPodcastUpdate(podcast);
  
    // Assert
    expect(params).toEqual({
      MessageBody: JSON.stringify(podcast)
    });
    expect(mockBehavior).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual('MESSAGE CORRECTLY SENT');
  });

  it('can throw an error when updating the podcast', async () => {
    // Setup
    const queue: PodcastQueue = new PodcastQueue({});
    const podcast: Podcast = new Podcast('12345', 'PODCAST_TITLE', 'AUTHOR', 'DESCRIPTION', ['CATEGORIES'], 'IMAGE_URL');

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.reject(new Error('ERROR THROWN')));
      
    // Test
    try {
      await queue.pushPodcastUpdate(podcast);
    } catch (err) {
      expect(params).toEqual({
        MessageBody: JSON.stringify(podcast)
      });
      expect(mockBehavior).toHaveBeenCalledTimes(1);
      expect(err.message).toEqual('ERROR THROWN');
    }
  });
});
