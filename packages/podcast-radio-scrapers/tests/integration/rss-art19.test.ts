import { URL } from 'url';
import { ScrapeFunction } from '../../src';
import { scraper } from '../../src/scrapers/rss-art19';

describe('rss-art19 scraper', () => {
  it('will scrape 10 episodes when no limit is provided', async () => {
    // Setup
    const url: URL = new URL('http://rss.art19.com/the-daily');
    const scrape: ScrapeFunction = scraper['rss.art19.com'];

    // Test
    const { podcast, episodes } = await scrape(url, undefined);

    // Assert
    expect(podcast).toBeDefined();
    expect(podcast.title).toEqual('The Daily');
    expect(podcast.author).toEqual('The New York Times');
    expect(episodes).toHaveLength(10);
  });

  it('will scrape 1 episode when limit of 1 is provided', async () => {
    // Setup
    const url: URL = new URL('http://rss.art19.com/the-daily');
    const scrape: ScrapeFunction = scraper['rss.art19.com'];

    // Test
    const { podcast, episodes } = await scrape(url, 1);

    // Assert
    expect(podcast).toBeDefined();
    expect(podcast.title).toEqual('The Daily');
    expect(podcast.author).toEqual('The New York Times');
    expect(episodes).toHaveLength(1);
  });
});