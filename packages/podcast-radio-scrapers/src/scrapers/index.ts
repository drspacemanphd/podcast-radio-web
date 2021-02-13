import { ScrapeFunction } from '../';
import { scraper as rss_art19 } from './rss-art19';

export const scraperMap: Record<string, ScrapeFunction> = {
  ...rss_art19
}