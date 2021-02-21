import { Episode } from '@drspacemanphd/podcast-radio-model';
import { EpisodeUpdatePusher } from '../../../src/episode/episode-update-pusher';

let params = null;
const mockBehavior = jest.fn();

jest.mock('aws-sdk', () => ({
  SQS: function () {
    return {
      sendMessage: (args) => {
        params = args;
        return {
          promise: mockBehavior
        }
      }
    }
  }
}));

afterEach(() => {
  mockBehavior.mockClear();
});

describe('Episode Update Pusher', () => {
  it('can push an episode', async () => {
    // Setup
    const episodeUpdatePusher: EpisodeUpdatePusher = new EpisodeUpdatePusher({ endpoint: 'endpoint', region: 'region', queueUrl: 'queue url'});
    const episode: Episode = new Episode(
      '12345', 'EPISODE TITLE', 'EPISODE AUTHOR', 'PODCAST ID', 'PODCAST_TITLE', 'DESCRIPTION', 'AUDIO_URL', 1000, new Date(), 0
    );

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.resolve('MESSAGE CORRECTLY SENT'));
    
    // Test
    const result = await episodeUpdatePusher.push(episode);

    // Assert
    expect(params).toEqual({
      QueueUrl: 'queue url',
      MessageBody: JSON.stringify(episode)
    });
    expect(mockBehavior).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual('MESSAGE CORRECTLY SENT');
  });

  it('can push a episode with default config', async () => {
    // Setup
    const episodeUpdatePusher: EpisodeUpdatePusher = new EpisodeUpdatePusher({});
    const episode: Episode = new Episode(
      '12345', 'EPISODE TITLE', 'EPISODE AUTHOR', 'PODCAST ID', 'PODCAST_TITLE', 'DESCRIPTION', 'AUDIO_URL', 1000, new Date(), 0
    );

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.resolve('MESSAGE CORRECTLY SENT'));
    
    // Test
    const result = await episodeUpdatePusher.push(episode);

    // Assert
    expect(params).toEqual({
      MessageBody: JSON.stringify(episode)
    });
    expect(mockBehavior).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual('MESSAGE CORRECTLY SENT');
  });

  it('can throw an error', async () => {
    // Setup
    const episodeUpdatePusher: EpisodeUpdatePusher = new EpisodeUpdatePusher({ endpoint: 'endpoint', region: 'region', queueUrl: 'queue url'});
    const episode: Episode = new Episode(
      '12345', 'EPISODE TITLE', 'EPISODE AUTHOR', 'PODCAST ID', 'PODCAST_TITLE', 'DESCRIPTION', 'AUDIO_URL', 1000, new Date(), 0
    );

    // Mock
    mockBehavior.mockImplementationOnce(() => Promise.reject(new Error('ERROR THROWN')));
    
    // Test
    try {
      await episodeUpdatePusher.push(episode);
    } catch (err) {
      expect(params).toEqual({
        QueueUrl: 'queue url',
        MessageBody: JSON.stringify(episode)
      });
      expect(mockBehavior).toHaveBeenCalledTimes(1);
      expect(err.message).toEqual('ERROR THROWN');
    }
  });
});