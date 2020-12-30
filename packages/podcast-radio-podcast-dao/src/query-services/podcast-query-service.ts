import { DynamoDB, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { IGetPodcastById, IGetPodcastByTitle, IGetPodcastByAuthor, IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { getQuery as getPodcastById } from '../queries/podcast/get-by-id';
import { getQuery as getPodcastByTitle } from '../queries/podcast/get-by-title';
import { getQuery as getPodcastByAuthor } from '../queries/podcast/get-by-author';
import { itemToPodcast } from '../util/item-to-podcast';

type Result = PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>;

export class PodcastQueryService implements IGetPodcastById, IGetPodcastByTitle, IGetPodcastByAuthor {
  private queryRunner: IQueryRunner<Promise<Result>, DynamoDB.DocumentClient.QueryInput>;

  constructor(queryRunner: IQueryRunner<Promise<Result>, DynamoDB.DocumentClient.QueryInput>) {
    this.queryRunner = queryRunner
  }

  async getById(id: string): Promise<Podcast> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getPodcastById(id);
    return this.queryRunner.run(params)
      .then(results => {
        if (results && results.Items && results.Items.length > 0) return itemToPodcast(results.Items[0]);
      });
  }

  async getByTitle(title: string): Promise<Podcast[]> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getPodcastByTitle(title);
    const results = await this.queryRunner.run(params);
    return results.Items.map(p => itemToPodcast(p));
  }

  async getByAuthor(author: string): Promise<Podcast[]> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getPodcastByAuthor(author);
    const results = await this.queryRunner.run(params);
    return results.Items.map(p => itemToPodcast(p));
  }
}