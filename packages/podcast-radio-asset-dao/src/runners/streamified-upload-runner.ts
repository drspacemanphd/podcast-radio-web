import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';

type Result = Promise<ManagedUpload.SendData>;
export class UploadAssetRunner implements IQueryRunner<Result, S3.PutObjectRequest> {
  private client: S3;

  constructor(s3: S3) {
    this.client = s3;
  }

  async run(query: IQuery<S3.PutObjectRequest>): Result {
    return await this.client.upload(query.params).promise();
  }
}