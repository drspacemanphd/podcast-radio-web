import { Podcast } from '@drspacemanphd/podcast-radio-model';

export interface IGetPodcastById {
  getById(id: string): Podcast;
}