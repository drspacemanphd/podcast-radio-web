import AWS from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { DynamoDBUpdateRunner } from '../../../src/runners/update-runner';

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: function () {
      return {
        update: () => ({
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
    const query: IQuery<AWS.DynamoDB.DocumentClient.UpdateItemInput> = {
      params: {
        TableName: 'PODCAST',
        Key: {
          GUID: 'GUID'
        },
        AttributeUpdates: {}
      }
    }

    const runner: DynamoDBUpdateRunner = new DynamoDBUpdateRunner(client);

    // Tests
    const actualResults: any = await runner.run(query);

    // Assertions
    expect('SUCCESSFUL').toEqual(actualResults);
  });
});