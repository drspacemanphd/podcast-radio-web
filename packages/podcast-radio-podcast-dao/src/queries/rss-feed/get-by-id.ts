import { IQuery } from '@drspacemanphd/podcast-radio-interfaces'
import { DynamoDB } from 'aws-sdk'

function getQuery(id: string): IQuery<DynamoDB.DocumentClient.QueryInput> {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: 'RSS_FEED',
    KeyConditionExpression: 'GUID = :id',
    ExpressionAttributeValues: {
      ':id': id
    }
  };

  return {
    params
  } as IQuery<DynamoDB.DocumentClient.QueryInput>;
}

export { getQuery };
