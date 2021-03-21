import { Readable } from 'stream';
import { S3 } from 'aws-sdk';
import { IQuery, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';

export class GetObjectRunner implements IQueryRunner<Readable, S3.GetObjectRequest> {
  private client: S3;

  constructor(s3: S3) {
    this.client = s3;
  }

  run(query: IQuery<S3.GetObjectRequest>): Readable {
    return this.client.getObject(query.params).createReadStream();
  }
}


