import { Episode } from '@drspacemanphd/podcast-radio-model';

export interface IGetEpisodeByCategory {
  getByCategory(category: string): Episode[];
}