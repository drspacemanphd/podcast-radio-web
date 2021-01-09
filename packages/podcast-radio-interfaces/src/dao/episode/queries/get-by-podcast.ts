import { Episode } from '@drspacemanphd/podcast-radio-model';

export interface IGetEpisodeByPodcast {
  getEpisodesByPodcast(podcastId: string): Episode[] | Promise<Episode[]>;
}