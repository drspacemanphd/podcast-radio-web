import { IRssScheduleDao } from '@drspacemanphd/podcast-radio-interfaces';
import { RssSchedule } from '@drspacemanphd/podcast-radio-model';

import { configureDynamoDB } from '../config/dynamo-db';

import { RssScheduleQueryService } from '../query-services/rss-schedule-query-service';
import { DynamoDBQueryRunner } from '../runners/query-runner';

import { RssScheduleMutationService } from '../mutation-services/rss-schedule-mutation-service';
import { DynamoDBPutRunner } from '../runners/put-runner';

export class RssScheduleDao implements IRssScheduleDao {
  rssScheduleQueryService: RssScheduleQueryService;
  rssScheduleMutationService: RssScheduleMutationService;

  constructor(config = { endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION }) {
    const db = configureDynamoDB(config);
    const queryRunner = new DynamoDBQueryRunner(db);
    const putRunner = new DynamoDBPutRunner(db);

    this.rssScheduleQueryService = new RssScheduleQueryService(queryRunner);
    this.rssScheduleMutationService = new RssScheduleMutationService(putRunner);
  }

  getRssScheduleById(id: string) {
    return this.rssScheduleQueryService.getRssScheduleById(id);
  }

  getRssScheduleByUrl(url: string) {
    return this.rssScheduleQueryService.getRssScheduleByUrl(url);
  }

  insertRssSchedule(rssSchedule: RssSchedule) {
    return this.rssScheduleMutationService.insertRssSchedule(rssSchedule);
  }
}


