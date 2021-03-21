import { S3 } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';

export function getMutation(podcastId: string, body: S3.Body, options?: Partial<S3.PutObjectRequest>): IQuery<S3.PutObjectRequest> {
  return {
    params: {
      Bucket: process.env.PODCAST_RADIO_BUCKET,
      Key: `${podcastId}/podcast-image.jpg`,
      Body: body,
      ACL: options?.ACL || 'authenticated-read',
      ContentType: options?.ContentType || 'image/jpeg',
      CacheControl: options?.CacheControl || 'max-age=14400',
    }
  }
}