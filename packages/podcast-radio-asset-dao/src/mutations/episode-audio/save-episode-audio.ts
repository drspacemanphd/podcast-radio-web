import { S3 } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';

export function getMutation(podcastId: string, episodeId: string, body: S3.Body, options?: Partial<S3.PutObjectRequest>): IQuery<S3.PutObjectRequest> {
  return {
    params: {
      Bucket: process.env.PODCAST_RADIO_BUCKET,
      Key: `${podcastId}/${episodeId}.mp3`,
      Body: body,
      ACL: options?.ACL || 'authenticated-read',
      ContentType: options?.ContentType || 'audio/mpeg',
      CacheControl: options?.CacheControl || 'max-age=14400'
    }
  }
}