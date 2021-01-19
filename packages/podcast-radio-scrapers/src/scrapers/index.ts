import { ScrapeFunction } from '../';
import { scraper as rss_art18 } from './rss-art18';

export const scraperMap: Record<string, ScrapeFunction> = {
  ...rss_art18
}