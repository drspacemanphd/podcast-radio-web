import { DynamoDB } from 'aws-sdk';
import { IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';

export class DynamoDBUpdateRunner implements IQueryRunner<any, DynamoDB.DocumentClient.UpdateItemInput> {
  private client: DynamoDB.DocumentClient;

  constructor(client: DynamoDB.DocumentClient) {
    this.client = client;
  }

  async run(query: IQuery<DynamoDB.DocumentClient.UpdateItemInput>): Promise<any> {
    return await this.client.update(query.params).promise();
  }
}