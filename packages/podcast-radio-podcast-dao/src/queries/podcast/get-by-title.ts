import { IQuery } from '@drspacemanphd/podcast-radio-interfaces'
import { DynamoDB } from 'aws-sdk'

function getQuery(title: string): IQuery<DynamoDB.DocumentClient.QueryInput> {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: 'PODCAST',
    KeyConditionExpression: 'TITLE = :title',
    ExpressionAttributeValues: {
      ':title': title
    },
    IndexName: 'TITLE'
  };

  return {
    params
  } as IQuery<DynamoDB.DocumentClient.QueryInput>;
}

export { getQuery };
