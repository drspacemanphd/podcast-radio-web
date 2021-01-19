import { IInsertRssSchedule, IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';
import { RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { DynamoDB } from 'aws-sdk';
import { getMutation as insertRssSchedule } from '../mutations/rss-schedule/put-schedule';

export class RssScheduleMutationService implements IInsertRssSchedule {
  private queryRunner: IQueryRunner<Promise<RssSchedule[]>, DynamoDB.DocumentClient.PutItemInput>;

  constructor(queryRunner: IQueryRunner<Promise<RssSchedule[]>, DynamoDB.DocumentClient.PutItemInput>) {
    this.queryRunner = queryRunner
  }

  async insertRssSchedule(schedule: RssSchedule): Promise<RssSchedule> {
    const params: IQuery<DynamoDB.DocumentClient.PutItemInput> = insertRssSchedule(schedule);
    await this.queryRunner.run(params);
    return Promise.resolve(schedule);
  }
}