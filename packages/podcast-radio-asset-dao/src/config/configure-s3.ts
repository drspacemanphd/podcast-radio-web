import { S3 } from 'aws-sdk';

export function configureS3(config = { endpoint: process.env.S3_ENDPOINT, region: process.env.S3_REGION }) {
  if (config.endpoint) {
    return new S3({ endpoint: config.endpoint, region: config.region });
  }

  return new S3({ region: config.region });
}
