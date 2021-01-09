import AWS from 'aws-sdk';
import { configureDynamoDB } from '../../../src/config/dynamo-db';

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn()
  }
}));

describe('DynamoDB Client', () => {
  test('can be configured for local development', () => {
    // Mock
    const mockClient: jest.Mock<Function> = (<unknown> AWS.DynamoDB.DocumentClient) as jest.Mock<Function>;
    mockClient.mockImplementation(params => params);

    // Test
    const configuredDB: any = <any> configureDynamoDB({ endpoint: 'endpoint', region: 'region' });

    // Assertions
    expect(configuredDB.endpoint).toEqual('endpoint');
    expect(configuredDB.region).toEqual('region');
  });

  test('can be configured for cloud development', () => {
    // Mock
    const mockClient: jest.Mock<Function> = (<unknown> AWS.DynamoDB.DocumentClient) as jest.Mock<Function>;
    mockClient.mockImplementation(params => params);

    // Test
    const configuredDB: any = <any> configureDynamoDB({ region: 'region' });

    // Assertions
    expect(configuredDB.endpoint).toBeUndefined();
    expect(configuredDB.region).toEqual('region');
  });
});