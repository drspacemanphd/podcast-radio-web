import { Podcast } from '@drspacemanphd/podcast-radio-model';

export interface IGetPodcastByCategory {
  getByCategory(category: string): Podcast[];
}