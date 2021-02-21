import { SQS } from 'aws-sdk';

export function configure(config: SQS.ClientConfiguration): SQS {
  if (config.endpoint) {
    return new SQS({
      endpoint: config.endpoint,
      region: config.region
    });
  }

  return new SQS({ region: config.region });
}
