import { DynamoDB, AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { IQuery, IQueryRunner, IGetRssScheduleByUrl, IGetRssScheduleById } from '@drspacemanphd/podcast-radio-interfaces';
import { RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { getQuery as getFeedById } from '../queries/rss-schedule/get-by-id';
import { getQuery as getFeedByUrl } from '../queries/rss-schedule/get-by-url';
import { itemToRssSchedule } from '../util/item-to-rss-schedule';

type Result = PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>;

export class RssScheduleQueryService implements IGetRssScheduleById, IGetRssScheduleByUrl {
  private queryRunner: IQueryRunner<Promise<Result>, DynamoDB.DocumentClient.QueryInput>;

  constructor(queryRunner: IQueryRunner<Promise<Result>, DynamoDB.DocumentClient.QueryInput>) {
    this.queryRunner = queryRunner
  }

  async getRssScheduleById(id: string): Promise<RssSchedule> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getFeedById(id);
    return this.queryRunner.run(params)
      .then(results => {
        if (results && results.Items && results.Items.length > 0) return itemToRssSchedule(results.Items[0]);
      });
  }

  async getRssScheduleByUrl(url: string): Promise<RssSchedule[]> {
    const params: IQuery<DynamoDB.DocumentClient.QueryInput> = getFeedByUrl(url);
    const results = await this.queryRunner.run(params);
    return results.Items.map(p => itemToRssSchedule(p));
  }
}