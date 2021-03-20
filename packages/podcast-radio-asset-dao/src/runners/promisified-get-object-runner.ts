import { AWSError, S3 } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';

type Result = PromiseResult<S3.GetObjectOutput, AWSError>

export class GetObjectRunner implements IQueryRunner<Promise<Result>, S3.GetObjectRequest> {
  private client: S3;

  constructor(s3: S3) {
    this.client = s3;
  }

  async run(query: IQuery<S3.GetObjectRequest>): Promise<Result> {
    return await this.client.getObject(query.params).promise();
  }
}
