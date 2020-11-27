import { Episode } from '@drspacemanphd/podcast-radio-model';
import { IQueryRunner } from '../query/query-runner';

export interface IEpisodeQueries {
  getEpisode(id: string, queryRunner: IQueryRunner<Episode>): Episode;

  getByPodcast(podcastId: string, queryRunner: IQueryRunner<Episode[]>): Episode[];

  getByCategory(category: string, queryRunner: IQueryRunner<Episode[]>): Episode[];
}