import { Podcast } from '@drspacemanphd/podcast-radio-model';

export interface IGetPodcastByTitle {
  getPodcastsByTitle(title: string): Podcast[] | Promise<Podcast[]>;
}