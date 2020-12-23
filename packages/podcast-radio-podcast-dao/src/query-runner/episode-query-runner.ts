import { DynamoDB } from 'aws-sdk';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';
import { itemToEpisode } from '../util/item-to-episode';

export class DynamoDBEpisodeQueryRunner implements IQueryRunner<Promise<Episode[]>, DynamoDB.DocumentClient.QueryInput> {
  private client: DynamoDB.DocumentClient;

  constructor(client: DynamoDB.DocumentClient) {
    this.client = client;
  }

  async run(query: IQuery<DynamoDB.DocumentClient.QueryInput>): Promise<Episode[]> {
    const result = await this.client.query(query.params).promise();
    const items = result.Items;
    return items.map(i => itemToEpisode(i));
  }
}