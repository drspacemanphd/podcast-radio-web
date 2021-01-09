import { DynamoDB } from 'aws-sdk';

function configureDynamoDB (env: Record<string, string>): DynamoDB.DocumentClient {
  if (env.endpoint) {
    return new DynamoDB.DocumentClient({
      endpoint: env.endpoint,
      region: env.region
    });
  }

  return new DynamoDB.DocumentClient({
    region: env.region
  });
}

export { configureDynamoDB };