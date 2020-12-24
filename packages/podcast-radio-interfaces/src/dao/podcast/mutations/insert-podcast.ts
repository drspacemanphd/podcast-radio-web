import { Podcast } from '@drspacemanphd/podcast-radio-model';

export interface IInsertPodcast {
  insertPodcast(podcast: Podcast): any;
}
