import { S3 } from 'aws-sdk';
import { IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';

type Result = S3.ManagedUpload.SendData

export class UploadAssetRunner implements IQueryRunner<Promise<Result>, S3.PutObjectRequest> {
  private client: S3;

  constructor(s3: S3) {
    this.client = s3;
  }

  async run(query: IQuery<S3.PutObjectRequest>): Promise<Result> {
    return await this.client.upload(query.params).promise();
  }
}
