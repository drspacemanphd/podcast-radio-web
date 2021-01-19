import { Podcast, Episode } from '@drspacemanphd/podcast-radio-model';
import { URL } from 'url';

type Scrape = (input: URL) => (Promise<{ podcast: Podcast, episodes: Episode[] }>);

export class Scraper {
  static async scrape(input: URL, func: Scrape): Promise<{ podcast: Podcast, episodes: Episode[] }> {
    return await func(input);
  }
}