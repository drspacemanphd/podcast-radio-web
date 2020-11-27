import { Episode } from '@drspacemanphd/podcast-radio-model';

export interface IGetEpisodeByPodcast {
  getByPodcast(podcastId: string): Episode[];
}