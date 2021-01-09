import { Podcast } from '@drspacemanphd/podcast-radio-model';

export interface IGetPodcastByAuthor {
  getPodcastsByAuthor(author: string): Podcast[] | Promise<Podcast[]>;
}