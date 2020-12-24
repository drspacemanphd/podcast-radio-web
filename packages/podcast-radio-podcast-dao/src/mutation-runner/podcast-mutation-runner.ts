import { DynamoDB } from 'aws-sdk';
import { IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';

export class DynamoDBPodcastMutationRunner implements IQueryRunner<any, DynamoDB.DocumentClient.PutItemInput> {
  private client: DynamoDB.DocumentClient;

  constructor(client: DynamoDB.DocumentClient) {
    this.client = client;
  }

  async run(query: IQuery<DynamoDB.DocumentClient.PutItemInput>): Promise<any> {
    return await this.client.put(query.params).promise();
  }
}