import { IInsertEpisode, IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { DynamoDB } from 'aws-sdk';
import { getMutation as insertEpisode } from '../mutations/episode/put-episode';

export class EpisodeMutationService implements IInsertEpisode {
  private queryRunner: IQueryRunner<Promise<Episode[]>, DynamoDB.DocumentClient.PutItemInput>;

  constructor(queryRunner: IQueryRunner<Promise<Episode[]>, DynamoDB.DocumentClient.PutItemInput>) {
    this.queryRunner = queryRunner
  }

  async insertEpisode(episode: Episode): Promise<Episode> {
    const params: IQuery<DynamoDB.DocumentClient.PutItemInput> = insertEpisode(episode);
    await this.queryRunner.run(params);
    return Promise.resolve(episode);
  }
}