import { IInsertPodcast, IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { DynamoDB } from 'aws-sdk';
import { getMutation as insertPodcast } from '../mutations/podcast/put-podcast';

export class PodcastMutationService implements IInsertPodcast {
  private queryRunner: IQueryRunner<Promise<Podcast[]>, DynamoDB.DocumentClient.PutItemInput>;

  constructor(queryRunner: IQueryRunner<Promise<Podcast[]>, DynamoDB.DocumentClient.PutItemInput>) {
    this.queryRunner = queryRunner
  }

  async insertPodcast(podcast: Podcast): Promise<Podcast> {
    const params: IQuery<DynamoDB.DocumentClient.PutItemInput> = insertPodcast(podcast);
    await this.queryRunner.run(params);
    return Promise.resolve(podcast);
  }
}