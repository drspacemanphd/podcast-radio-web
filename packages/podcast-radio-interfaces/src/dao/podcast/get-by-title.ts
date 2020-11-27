import { Podcast } from '@drspacemanphd/podcast-radio-model';

export interface IGetPodcastByTitle {
  getByTitle(title: string): Podcast[];
}