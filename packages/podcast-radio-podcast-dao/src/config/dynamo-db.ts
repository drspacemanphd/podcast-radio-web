import { DynamoDB } from 'aws-sdk';

function configureDynamoDB (env: Record<string, string>): DynamoDB.DocumentClient {
  if (env.DYNAMODB_ENDPOINT) {
    return new DynamoDB.DocumentClient({
      endpoint: env.DYNAMODB_ENDPOINT,
      region: env.DYNAMODB_REGION
    });
  }

  return new DynamoDB.DocumentClient({
    region: env.DYNAMODB_REGION
  });
}

export { configureDynamoDB };