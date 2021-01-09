import { Episode } from '@drspacemanphd/podcast-radio-model';

export interface IGetEpisodeByCategory {
  getEpisodesByCategory(category: string): Episode[] | Promise<Episode[]>;
}
