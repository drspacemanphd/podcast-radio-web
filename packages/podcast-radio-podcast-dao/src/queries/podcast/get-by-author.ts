import { IQuery } from '@drspacemanphd/podcast-radio-interfaces'
import { DynamoDB } from 'aws-sdk'

function getQuery(author: string): IQuery<DynamoDB.DocumentClient.QueryInput> {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: 'PODCAST',
    KeyConditionExpression: 'AUTHOR = :author',
    ExpressionAttributeValues: {
      ':author': author
    },
    IndexName: 'AUTHOR_TITLE'
  };

  return {
    params
  } as IQuery<DynamoDB.DocumentClient.QueryInput>;
}

export { getQuery };
