import { AWSError, DynamoDB } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';

type Result = PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>;

export class DynamoDBQueryRunner implements IQueryRunner<Promise<Result>, DynamoDB.DocumentClient.QueryInput> {
  private client: DynamoDB.DocumentClient;

  constructor(client: DynamoDB.DocumentClient) {
    this.client = client;
  }

  async run(query: IQuery<DynamoDB.DocumentClient.QueryInput>): Promise<Result> {
    return await this.client.query(query.params).promise();
  }
}