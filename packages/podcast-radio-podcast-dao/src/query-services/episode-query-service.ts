import { DynamoDB, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { IGetEpisodeById, IGetEpisodeByPodcast, IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { getQuery as getEpisodeById } from '../queries/episode/get-by-id';
import { getQuery as getEpisodeByPodcast } from '../queries/episode/get-by-podcast';
import { itemToEpisode } from '../util/item-to-episode';

type Result = PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>;

export class EpisodeQueryService implements IGetEpisodeById, IGetEpisodeByPodcast {
  private queryRunner: IQueryRunner<Promise<Result>, DynamoDB.DocumentClient.QueryInput>;

  constructor(queryRunner: IQueryRunner<Promise<Result>, DynamoDB.DocumentClient.QueryInput>) {
    this.queryRunner = queryRunner
  }

  async getEpisodeById(id: string): Promise<Episode> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getEpisodeById(id);
    return this.queryRunner.run(params)
      .then(results => {
        if (results && results.Items && results.Items.length > 0) return itemToEpisode(results.Items[0]);
      });
  }

  async getEpisodesByPodcast(podcastId: string): Promise<Episode[]> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getEpisodeByPodcast(podcastId);
    const results = await this.queryRunner.run(params);
    return results.Items.map(e => itemToEpisode(e));
  }
}