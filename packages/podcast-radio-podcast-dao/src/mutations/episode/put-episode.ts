import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { Episode } from '@drspacemanphd/podcast-radio-model';

export function getMutation(episode: Episode): IQuery<DynamoDB.DocumentClient.PutItemInput> {
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: 'EPISODE',
    Item: {
      GUID: episode.guid,
      TITLE: episode.title,
      AUTHOR: episode.author,
      PODCAST_ID: episode.podcastId,
      PODCAST_TITLE: episode.podcastTitle,
      DESCRIPTION: episode.description,
      AUDIO_URL: episode.audioUrl,
      DURATION: episode.duration,
      PUBLICATION_DATE: episode.publicationDate.getTime(),
      PLAY_COUNT: episode.playCount,
      KEYWORDS: episode.keywords,
      TAGS: episode.tags
    }
  }

  return {
    params
  } as IQuery<DynamoDB.DocumentClient.PutItemInput>
}
