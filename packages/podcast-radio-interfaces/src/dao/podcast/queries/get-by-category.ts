import { Podcast } from '@drspacemanphd/podcast-radio-model';

export interface IGetPodcastByCategory {
  getPodcastsByCategory(category: string): Podcast[] | Promise<Podcast[]>;
}