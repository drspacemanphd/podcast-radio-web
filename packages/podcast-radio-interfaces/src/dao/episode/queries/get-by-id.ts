import { Episode } from '@drspacemanphd/podcast-radio-model';

export interface IGetEpisodeById {
  getById(id: string): Episode | Promise<Episode>;
}