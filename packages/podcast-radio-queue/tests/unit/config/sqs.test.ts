import { SQS } from 'aws-sdk';
import { configure } from '../../../src/config/sqs';

describe('SQS configure function', () => {
  it('can be created with endpoint and region', () => {
      const sqs: SQS = configure({ endpoint: 'endpoint', region: 'region' });
      expect(sqs).toBeDefined();
  });

  it('can be created with just a region', () => {
    const sqs: SQS = configure({ region: 'region' });
    expect(sqs).toBeDefined();
  })
})