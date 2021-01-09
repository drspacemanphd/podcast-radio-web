import { IQuery } from '@drspacemanphd/podcast-radio-interfaces'
import { DynamoDB } from 'aws-sdk'

function getQuery(url: string): IQuery<DynamoDB.DocumentClient.QueryInput> {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: 'RSS_FEED',
    KeyConditionExpression: 'RSS_URL = :url',
    ExpressionAttributeValues: {
      ':url': url
    },
    IndexName: 'RSS_URL',
    ScanIndexForward: true
  };

  return {
    params
  } as IQuery<DynamoDB.DocumentClient.QueryInput>;
}

export { getQuery };
