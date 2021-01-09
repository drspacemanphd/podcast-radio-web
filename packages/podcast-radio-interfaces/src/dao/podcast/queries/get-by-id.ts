import { Podcast } from '@drspacemanphd/podcast-radio-model';

export interface IGetPodcastById {
  getPodcastById(id: string): Podcast | Promise<Podcast>;
}