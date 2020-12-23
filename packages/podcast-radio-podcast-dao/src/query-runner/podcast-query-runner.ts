import { DynamoDB } from 'aws-sdk';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';
import { itemToPodcast } from '../util/item-to-podcast';

export class DynamoDBPodcastQueryRunner implements IQueryRunner<Promise<Podcast[]>, DynamoDB.DocumentClient.QueryInput> {
  private client: DynamoDB.DocumentClient;

  constructor(client: DynamoDB.DocumentClient) {
    this.client = client;
  }

  async run(query: IQuery<DynamoDB.DocumentClient.QueryInput>): Promise<Podcast[]> {
    const result = await this.client.query(query.params).promise();
    const items = result.Items;
    return items.map(i => itemToPodcast(i));
  }
}