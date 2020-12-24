import { Episode } from '@drspacemanphd/podcast-radio-model';

export interface IInsertEpisode {
  insertEpisode(episode: Episode): any;
}
