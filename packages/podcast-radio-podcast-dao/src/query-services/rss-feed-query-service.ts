import { DynamoDB, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { IQuery, IQueryRunner, IGetRssFeedByUrl } from '@drspacemanphd/podcast-radio-interfaces';
import { RssFeed } from '@drspacemanphd/podcast-radio-model';
import { getQuery as getFeedById } from '../queries/rss-feed/get-by-id';
import { getQuery as getFeedByUrl } from '../queries/rss-feed/get-by-url';
import { itemToRssFeed } from '../util/item-to-rss-feed';

type Result = PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>;

export class RssFeedQueryService implements IGetRssFeedByUrl {
  private queryRunner: IQueryRunner<Promise<Result>, DynamoDB.DocumentClient.QueryInput>;

  constructor(queryRunner: IQueryRunner<Promise<Result>, DynamoDB.DocumentClient.QueryInput>) {
    this.queryRunner = queryRunner
  }

  async getFeedById(id: string): Promise<RssFeed> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getFeedById(id);
    return this.queryRunner.run(params)
      .then(results => {
        if (results && results.Items && results.Items.length > 0) return itemToRssFeed(results.Items[0]);
      });
  }

  async getFeedByUrl(url: string): Promise<RssFeed[]> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getFeedByUrl(url);
    const results = await this.queryRunner.run(params);
    return results.Items.map(p => itemToRssFeed(p));
  }
}