import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { Podcast } from '@drspacemanphd/podcast-radio-model';

export function getMutation(podcast: Podcast): IQuery<DynamoDB.DocumentClient.PutItemInput> {
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: 'PODCAST',
    Item: {
      GUID: podcast.guid,
      TITLE: podcast.title,
      AUTHOR: podcast.author,
      DESCRIPTION: podcast.description,
      IMAGE_URL: podcast.imageUrl,
      CATEGORIES: podcast.categories,
      KEYWORDS: podcast.keywords,
      TAGS: podcast.tags
    }
  }

  return {
    params
  } as IQuery<DynamoDB.DocumentClient.PutItemInput>
}