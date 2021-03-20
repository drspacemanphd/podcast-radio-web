import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';

export class UploadAssetRunner implements IQueryRunner<ManagedUpload, S3.PutObjectRequest> {
  private client: S3;

  constructor(s3: S3) {
    this.client = s3;
  }

  run(query: IQuery<S3.PutObjectRequest>): ManagedUpload {
    return this.client.upload(query.params, (err, data) => {
      if (err) {
        throw err;
      }
      return data;
    });
  }
}