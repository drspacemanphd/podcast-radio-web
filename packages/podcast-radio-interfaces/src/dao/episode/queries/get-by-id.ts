import { Episode } from '@drspacemanphd/podcast-radio-model';

export interface IGetEpisodeById {
  getEpisodeById(id: string): Episode | Promise<Episode>;
}