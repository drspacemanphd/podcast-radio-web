import { Podcast } from '@drspacemanphd/podcast-radio-model';
import IQueryRunner from '../query/query-runner';

export interface IPodcastQueries {
  getPodcast(id: string, queryRunner: IQueryRunner<Podcast>): Podcast;

  getByCategory(category: string, queryRunner: IQueryRunner<Podcast[]>): Podcast[];

  getByTitle(title: string, queryRunner: IQueryRunner<Podcast[]>): Podcast[];

  getByAuthor(author: string, queryRunner: IQueryRunner<Podcast[]>): Podcast[];
}
