import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { PodcastUpdatePusher } from '../../../src/podcast/podcast-update-pusher';

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

describe('Podcast Update Pusher', () => {
  it('can push a podcast', async () => {
    // Setup
    const podcastUpdatePusher: PodcastUpdatePusher = new PodcastUpdatePusher({ endpoint: 'endpoint', region: 'region', queueUrl: 'queue url'});
    const podcast: Podcast = new Podcast('12345', 'PODCAST_TITLE', 'AUTHOR', 'DESCRIPTION', ['CATEGORIES'], 'IMAGE');

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.resolve('MESSAGE CORRECTLY SENT'));
    
    // Test
    const result = await podcastUpdatePusher.push(podcast);

    // Assert
    expect(params).toEqual({
      QueueUrl: 'queue url',
      MessageBody: JSON.stringify(podcast)
    });
    expect(mockBehavior).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual('MESSAGE CORRECTLY SENT');
  });

  it('can push a podcast with default config', async () => {
    const podcastUpdatePusher: PodcastUpdatePusher = new PodcastUpdatePusher({});
    const podcast: Podcast = new Podcast('12345', 'PODCAST_TITLE', 'AUTHOR', 'DESCRIPTION', ['CATEGORIES'], 'IMAGE');

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.resolve('MESSAGE CORRECTLY SENT'));
    
    // Test
    const result = await podcastUpdatePusher.push(podcast);

    // Assert
    expect(params).toEqual({
      MessageBody: JSON.stringify(podcast)
    });
    expect(mockBehavior).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual('MESSAGE CORRECTLY SENT');
  });

  it('can throw an error', async () => {
    const podcastUpdatePusher: PodcastUpdatePusher = new PodcastUpdatePusher({});
    const podcast: Podcast = new Podcast('12345', 'PODCAST_TITLE', 'AUTHOR', 'DESCRIPTION', ['CATEGORIES'], 'IMAGE');

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.reject(new Error('ERROR THROWN')));
    
    // Test
    try {
      await podcastUpdatePusher.push(podcast);
    } catch (err) {
      expect(params).toEqual({
        QueueUrl: undefined,
        MessageBody: JSON.stringify(podcast)
      });
      expect(mockBehavior).toHaveBeenCalledTimes(1);
      expect(err.message).toEqual('ERROR THROWN');
    }
  });
});