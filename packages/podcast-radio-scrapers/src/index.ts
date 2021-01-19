import { URL } from 'url';
import { Podcast, Episode } from '@drspacemanphd/podcast-radio-model';
import { scraperMap } from './scrapers';

export type ScrapeFunction = (url: URL) => Promise<{ podcast: Podcast, episodes: Episode[] }>

export class RssScraper {
  static async scrape(url: URL): Promise<{ podcast: Podcast, episodes: Episode[] }> {
    const host: string = url.host;
    const scrape: ScrapeFunction = scraperMap[host];
    return await scrape(url);
  }
}
