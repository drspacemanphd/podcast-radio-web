import { IInsertFeed, IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';
import { RssFeed } from '@drspacemanphd/podcast-radio-model';
import { DynamoDB } from 'aws-sdk';
import { getMutation as insertRssFeed } from '../mutations/rss-feed/put-feed';

export class RssFeedMutationService implements IInsertFeed {
  private queryRunner: IQueryRunner<Promise<RssFeed[]>, DynamoDB.DocumentClient.PutItemInput>;

  constructor(queryRunner: IQueryRunner<Promise<RssFeed[]>, DynamoDB.DocumentClient.PutItemInput>) {
    this.queryRunner = queryRunner
  }

  async insertFeed(feed: RssFeed): Promise<RssFeed> {
    const params: IQuery<DynamoDB.DocumentClient.PutItemInput> = insertRssFeed(feed);
    await this.queryRunner.run(params);
    return Promise.resolve(feed);
  }
}