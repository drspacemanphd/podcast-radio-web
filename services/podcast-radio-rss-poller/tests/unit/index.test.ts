import { Podcast, Episode } from '@drspacemanphd/podcast-radio-model';
import { RssScraper } from '@drspacemanphd/podcast-radio-scrapers';
import { handler } from '../../src/index';
import RssSchedule from '../../../../packages/podcast-radio-model/src/rss-schedule/rss-schedule';

const getEpisodesMock = jest.fn();
const insertRssMock = jest.fn();

jest.mock('@drspacemanphd/podcast-radio-scrapers', () => ({
  RssScraper: {
    scrape: jest.fn()
  }
}));

jest.mock('@drspacemanphd/podcast-radio-podcast-dao', () => ({
  PodcastDao: function () {
    return {
      getEpisodesByPodcast: getEpisodesMock
    }
  },
  RssScheduleDao: function () {
    return {
      insertRssSchedule: insertRssMock
    }
  }
}));

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Rss Poller', () => {
  it('responds to a TTL event by scraping an rss feed to find no new episodes', async () => {
    // Setup
    const event: Record<string, any> = {
      Records: [{
        eventID: '1',
        eventVersion: '1.1',
        dynamodb: {
          ApproximateCreationDateTime: 1613217664.3827124,
          StreamViewType: 'NEW_AND_OLD_IMAGES',
          SizeBytes: -1,
          Keys: {
            GUID: {
              S: '45678'
            }
          },
          OldImage: {
            GUID: {
              S: '45678'
            },
            CRON: {
              S: '*/5 * * * *'
            },
            PODCAST_ID: {
              S: '12345'
            },
            NEXT_START: {
              N: '1613217663'
            },
            RSS_URL: {
              S: 'http://rss.art19.com/the-daily'
            }
          }
        },
        awsRegion: 'us-east-1',
        eventSource: 'aws:dynamodb',
        eventName: 'REMOVE',
        eventSourceARN: 'arn:aws:dynamodb:us-east-1:000000000000:table/RSS_SCHEDULE'
      }]
    }

    const podcast: Podcast = new Podcast(
      '12345', 'The Daily', 'The New York Times', 'A description', ['Daily News']
    );

    const episodes: Episode[] = [
      new Episode(
        'guid', 'TITLE TWO', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE ONE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const newSchedule: RssSchedule = new RssSchedule('guid', '12345', 'url', 'cron');

    // Mock
    jest.spyOn(RssScraper, 'scrape').mockImplementation(() => {
      return Promise.resolve({ podcast, episodes });
    });

    getEpisodesMock.mockImplementation(() => {
      return Promise.resolve(episodes);
    });

    insertRssMock.mockImplementation(() => {
      return Promise.resolve(newSchedule);
    });

    // Test
    const newEpisodes: Episode[] = await handler(event);

    // Assert
    expect(newEpisodes).toBeDefined();
    expect(newEpisodes).toHaveLength(0);
  });

  it('responds to a TTL event by scraping an rss feed to find two new episodes', async () => {
    // Setup
    const event: Record<string, any> = {
      Records: [{
        eventID: '1',
        eventVersion: '1.1',
        dynamodb: {
          ApproximateCreationDateTime: 1613217664.3827124,
          StreamViewType: 'NEW_AND_OLD_IMAGES',
          SizeBytes: -1,
          Keys: {
            GUID: {
              S: '45678'
            }
          },
          OldImage: {
            GUID: {
              S: '45678'
            },
            CRON: {
              S: '*/5 * * * *'
            },
            PODCAST_ID: {
              S: '12345'
            },
            NEXT_START: {
              N: '1613217663'
            },
            RSS_URL: {
              S: 'http://rss.art19.com/the-daily'
            }
          }
        },
        awsRegion: 'us-east-1',
        eventSource: 'aws:dynamodb',
        eventName: 'REMOVE',
        eventSourceARN: 'arn:aws:dynamodb:us-east-1:000000000000:table/RSS_SCHEDULE'
      }]
    }

    const podcast: Podcast = new Podcast(
      '12345', 'The Daily', 'The New York Times', 'A description', ['Daily News']
    );

    const savedEpisodes: Episode[] = [
      new Episode(
        'guid', 'TITLE TWO', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE ONE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const feedEpisodes: Episode[] = [
      new Episode(
        'guid', 'TITLE FOUR', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE THREE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const newSchedule: RssSchedule = new RssSchedule('guid', '12345', 'url', 'cron');

    // Mock
    jest.spyOn(RssScraper, 'scrape').mockImplementation(() => {
      return Promise.resolve({ podcast, episodes: feedEpisodes });
    });

    getEpisodesMock.mockImplementation(() => {
      return Promise.resolve(savedEpisodes);
    });

    insertRssMock.mockImplementation(() => {
      return Promise.resolve(newSchedule);
    });

    // Test
    const newEpisodes: Episode[] = await handler(event);

    // Assert
    expect(newEpisodes).toBeDefined();
    expect(newEpisodes).toHaveLength(2);
    expect(newEpisodes[0].title).toEqual('TITLE FOUR');
    expect(newEpisodes[1].title).toEqual('TITLE THREE');
  });

  it('returns null if event has not records', async () => {
    // Setup
    const event: Record<string, any> = {
      Records: []
    }

    const podcast: Podcast = new Podcast(
      '12345', 'The Daily', 'The New York Times', 'A description', ['Daily News']
    );

    const savedEpisodes: Episode[] = [
      new Episode(
        'guid', 'TITLE TWO', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE ONE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const feedEpisodes: Episode[] = [
      new Episode(
        'guid', 'TITLE FOUR', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE THREE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const newSchedule: RssSchedule = new RssSchedule('guid', '12345', 'url', 'cron');

    // Mock
    jest.spyOn(RssScraper, 'scrape').mockImplementation(() => {
      return Promise.resolve({ podcast, episodes: feedEpisodes });
    });

    getEpisodesMock.mockImplementation(() => {
      return Promise.resolve(savedEpisodes);
    });

    insertRssMock.mockImplementation(() => {
      return Promise.resolve(newSchedule);
    });

    // Test
    const newEpisodes: Episode[] = await handler(event);

    // Assert
    expect(newEpisodes).toBeUndefined();
  });

  it('returns null if event has is not a REMOVE event', async () => {
    // Setup
    const event: Record<string, any> = {
      Records: [{
        eventID: '1',
        eventVersion: '1.1',
        dynamodb: {
          ApproximateCreationDateTime: 1613217664.3827124,
          StreamViewType: 'NEW_AND_OLD_IMAGES',
          SizeBytes: -1,
          Keys: {
            GUID: {
              S: '45678'
            }
          },
          OldImage: {
            GUID: {
              S: '45678'
            },
            CRON: {
              S: '*/5 * * * *'
            },
            PODCAST_ID: {
              S: '12345'
            },
            NEXT_START: {
              N: '1613217663'
            },
            RSS_URL: {
              S: 'http://rss.art19.com/the-daily'
            }
          }
        },
        awsRegion: 'us-east-1',
        eventSource: 'aws:dynamodb',
        eventName: 'ADD',
        eventSourceARN: 'arn:aws:dynamodb:us-east-1:000000000000:table/RSS_SCHEDULE'
      }]
    }

    const podcast: Podcast = new Podcast(
      '12345', 'The Daily', 'The New York Times', 'A description', ['Daily News']
    );

    const savedEpisodes: Episode[] = [
      new Episode(
        'guid', 'TITLE TWO', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE ONE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const feedEpisodes: Episode[] = [
      new Episode(
        'guid', 'TITLE FOUR', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE THREE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const newSchedule: RssSchedule = new RssSchedule('guid', '12345', 'url', 'cron');

    // Mock
    jest.spyOn(RssScraper, 'scrape').mockImplementation(() => {
      return Promise.resolve({ podcast, episodes: feedEpisodes });
    });

    getEpisodesMock.mockImplementation(() => {
      return Promise.resolve(savedEpisodes);
    });

    insertRssMock.mockImplementation(() => {
      return Promise.resolve(newSchedule);
    });

    // Test
    const newEpisodes: Episode[] = await handler(event);

    // Assert
    expect(newEpisodes).toBeUndefined();
  });

  it('returns null if event does not have valid rss url', async () => {
    // Setup
    const event: Record<string, any> = {
      Records: [{
        eventID: '1',
        eventVersion: '1.1',
        dynamodb: {
          ApproximateCreationDateTime: 1613217664.3827124,
          StreamViewType: 'NEW_AND_OLD_IMAGES',
          SizeBytes: -1,
          Keys: {
            GUID: {
              S: '45678'
            }
          },
          OldImage: {
            GUID: {
              S: '45678'
            },
            CRON: {
              S: '*/5 * * * *'
            },
            PODCAST_ID: {
              S: '12345'
            },
            NEXT_START: {
              N: '1613217663'
            }
          }
        },
        awsRegion: 'us-east-1',
        eventSource: 'aws:dynamodb',
        eventName: 'REMOVE',
        eventSourceARN: 'arn:aws:dynamodb:us-east-1:000000000000:table/RSS_SCHEDULE'
      }]
    }

    const podcast: Podcast = new Podcast(
      '12345', 'The Daily', 'The New York Times', 'A description', ['Daily News']
    );

    const savedEpisodes: Episode[] = [
      new Episode(
        'guid', 'TITLE TWO', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE ONE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const feedEpisodes: Episode[] = [
      new Episode(
        'guid', 'TITLE FOUR', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE THREE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const newSchedule: RssSchedule = new RssSchedule('guid', '12345', 'url', 'cron');

    // Mock
    jest.spyOn(RssScraper, 'scrape').mockImplementation(() => {
      return Promise.resolve({ podcast, episodes: feedEpisodes });
    });

    getEpisodesMock.mockImplementation(() => {
      return Promise.resolve(savedEpisodes);
    });

    insertRssMock.mockImplementation(() => {
      return Promise.resolve(newSchedule);
    });

    // Test
    const newEpisodes: Episode[] = await handler(event);

    // Assert
    expect(newEpisodes).toBeUndefined();
  });

  it('returns null if event does not have valid podcast id', async () => {
    // Setup
    const event: Record<string, any> = {
      Records: [{
        eventID: '1',
        eventVersion: '1.1',
        dynamodb: {
          ApproximateCreationDateTime: 1613217664.3827124,
          StreamViewType: 'NEW_AND_OLD_IMAGES',
          SizeBytes: -1,
          Keys: {
            GUID: {
              S: '45678'
            }
          },
          OldImage: {
            GUID: {
              S: '45678'
            },
            CRON: {
              S: '*/5 * * * *'
            },
            NEXT_START: {
              N: '1613217663'
            },
            RSS_URL: {
              S: 'http://rss.art19.com/the-daily'
            }
          }
        },
        awsRegion: 'us-east-1',
        eventSource: 'aws:dynamodb',
        eventName: 'REMOVE',
        eventSourceARN: 'arn:aws:dynamodb:us-east-1:000000000000:table/RSS_SCHEDULE'
      }]
    }

    const podcast: Podcast = new Podcast(
      '12345', 'The Daily', 'The New York Times', 'A description', ['Daily News']
    );

    const savedEpisodes: Episode[] = [
      new Episode(
        'guid', 'TITLE TWO', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE ONE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const feedEpisodes: Episode[] = [
      new Episode(
        'guid', 'TITLE FOUR', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE THREE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const newSchedule: RssSchedule = new RssSchedule('guid', '12345', 'url', 'cron');

    // Mock
    jest.spyOn(RssScraper, 'scrape').mockImplementation(() => {
      return Promise.resolve({ podcast, episodes: feedEpisodes });
    });

    getEpisodesMock.mockImplementation(() => {
      return Promise.resolve(savedEpisodes);
    });

    insertRssMock.mockImplementation(() => {
      return Promise.resolve(newSchedule);
    });

    // Test
    const newEpisodes: Episode[] = await handler(event);

    // Assert
    expect(newEpisodes).toBeUndefined();
  });

  it('can re-throw error', async () => {
    // Setup
    const event: Record<string, any> = {
      Records: [{
        eventID: '1',
        eventVersion: '1.1',
        dynamodb: {
          ApproximateCreationDateTime: 1613217664.3827124,
          StreamViewType: 'NEW_AND_OLD_IMAGES',
          SizeBytes: -1,
          Keys: {
            GUID: {
              S: '45678'
            }
          },
          OldImage: {
            GUID: {
              S: '45678'
            },
            CRON: {
              S: '*/5 * * * *'
            },
            PODCAST_ID: {
              S: '12345'
            },
            NEXT_START: {
              N: '1613217663'
            },
            RSS_URL: {
              S: 'http://rss.art19.com/the-daily'
            }
          }
        },
        awsRegion: 'us-east-1',
        eventSource: 'aws:dynamodb',
        eventName: 'REMOVE',
        eventSourceARN: 'arn:aws:dynamodb:us-east-1:000000000000:table/RSS_SCHEDULE'
      }]
    }

    const podcast: Podcast = new Podcast(
      '12345', 'The Daily', 'The New York Times', 'A description', ['Daily News']
    );

    const episodes: Episode[] = [
      new Episode(
        'guid', 'TITLE TWO', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 100, new Date(100000), 0
      ),
      new Episode(
        'guid', 'TITLE ONE', 'The New York Times', '12345', 'The Daily', 'A description', 'audio url', 50, new Date(50000), 0
      )
    ]

    const newSchedule: RssSchedule = new RssSchedule('guid', '12345', 'url', 'cron');

    // Mock
    jest.spyOn(RssScraper, 'scrape').mockImplementation(() => {
      return Promise.reject(new Error('SCRAPE ERROR'));
    });

    getEpisodesMock.mockImplementation(() => {
      return Promise.resolve(episodes);
    });

    insertRssMock.mockImplementation(() => {
      return Promise.resolve(newSchedule);
    });

    // Test
    try {
      await handler(event);
      throw new Error('SHOULD NOT REACH HERE');
    } catch (err) {
      expect(err.message).toEqual('SCRAPE ERROR');
    }
  });
});