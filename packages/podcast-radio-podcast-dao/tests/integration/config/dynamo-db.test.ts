import { DynamoDB } from 'aws-sdk'
import { configureDynamoDB } from '../../../src/config/dynamo-db';

describe('DynamoDB Config', () => {
test('it should be setup properly', () => {
    const env: Record<string, any> = process.env;
    expect(env.DYNAMODB_ENDPOINT).toEqual('http://localhost:4566');
    expect(env.DYNAMODB_REGION).toEqual('us-east-1');
    const DB = configureDynamoDB({ endpoint: env.DYNAMODB_ENDPOINT, region: env.DYNAMODB_REGION });
    expect(DB instanceof DynamoDB.DocumentClient).toBeTruthy();
  });
});