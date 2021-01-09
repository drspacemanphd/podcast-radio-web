import AWS from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { DynamoDBPutRunner } from '../../../src/runners/put-runner';

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: function () {
      return {
        put: () => ({
          promise: jest.fn(() => Promise.resolve('SUCCESSFUL'))
        })
      }
    }
  }
}));

describe('Query Runner', () => {
  test('can execute queries', async () => {
    // Setup
    const client = new AWS.DynamoDB.DocumentClient();
    const query: IQuery<AWS.DynamoDB.DocumentClient.PutItemInput> = {
      params: {
        TableName: 'PODCAST',
        Item: {}
      }
    }

    const runner: DynamoDBPutRunner = new DynamoDBPutRunner(client);

    // Tests
    const actualResults: any = await runner.run(query);

    // Assertions
    expect('SUCCESSFUL').toEqual(actualResults);
  });
});