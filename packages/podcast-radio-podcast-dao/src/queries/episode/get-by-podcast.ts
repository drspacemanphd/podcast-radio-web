import { IQuery } from '@drspacemanphd/podcast-radio-interfaces'
import { DynamoDB } from 'aws-sdk'

function getQuery(id: string): IQuery<DynamoDB.DocumentClient.QueryInput> {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: 'EPISODE',
    KeyConditionExpression: 'PODCAST_ID = :id',
    ExpressionAttributeValues: {
      ':id': id
    },
    IndexName: 'PODCAST_ID'
  };

  return {
    params
  } as IQuery<DynamoDB.DocumentClient.QueryInput>;
}

export { getQuery };
