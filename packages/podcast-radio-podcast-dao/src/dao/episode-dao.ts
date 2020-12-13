import { IGetEpisodeById, IGetEpisodeByPodcast, IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { DynamoDB } from 'aws-sdk';
import { getQuery as getEpisodeById } from '../queries/episode/get-by-id';
import { getQuery as getEpisodeByPodcast } from '../queries/episode/get-by-podcast';


export class IEpisodeDao implements IGetEpisodeById, IGetEpisodeByPodcast {
  private queryRunner: IQueryRunner<Promise<Episode[]>, DynamoDB.DocumentClient.QueryInput>;

  constructor(queryRunner: IQueryRunner<Promise<Episode[]>, DynamoDB.DocumentClient.QueryInput>) {
    this.queryRunner = queryRunner
  }

  async getEpisode(id: string): Promise<Episode> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getEpisodeById(id);
    return this.queryRunner.run(params)
      .then(episodes => {
        if (episodes) return episodes[0];
      });
  }

  async getByPodcast(podcastId: string): Promise<Episode[]> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getEpisodeByPodcast(podcastId);
    return this.queryRunner.run(params);
  }
}