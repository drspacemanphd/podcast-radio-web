import { Podcast } from '@drspacemanphd/podcast-radio-model';

export interface IGetPodcastByAuthor {
  getByAuthor(author: string): Podcast[] | Promise<Podcast[]>;
}