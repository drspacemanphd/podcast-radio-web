import { Episode } from '@drspacemanphd/podcast-radio-model';

export interface IGetEpisodeById {
  getEpisode(id: string): Episode | Promise<Episode>;
}