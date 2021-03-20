import { S3 } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';

export function getQuery(podcastId: string, options?: Partial<S3.GetObjectRequest>): IQuery<S3.GetObjectRequest> {
  return {
    params: {
      Bucket: process.env.PODCAST_RADIO_BUCKET,
      Key: `${podcastId}/podcast-image.jpg`,
      ResponseCacheControl: options.ResponseCacheControl || 'max-age=14400',
      ResponseContentType: options.ResponseContentType || 'image/jpeg'
    }
  }
}