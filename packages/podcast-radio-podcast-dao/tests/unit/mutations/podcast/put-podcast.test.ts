import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { getMutation as putPodcast } from '../../../../src/mutations/podcast/put-podcast';

describe('Mutation', () => {
  test('is correct', () => {
    // Setup
    const podcast = new Podcast('12345', 'A_TITLE', 'AN_AUTHOR', 'A_DESCRIPTION', ['A CAT'], 'An image url', ['A keyword'], ['a tag']);
    const expectedItem: any = {
      'GUID': '12345',
      'TITLE': 'A_TITLE',
      'AUTHOR': 'AN_AUTHOR',
      'DESCRIPTION': 'A_DESCRIPTION',
      'CATEGORIES': ['A CAT'],
      'IMAGE': 'An image url',
      'KEYWORDS': ['A keyword'],
      'TAGS': ['a tag']
    }
    // Test
    const query: IQuery<DynamoDB.DocumentClient.PutItemInput> = putPodcast(podcast);

    // Assertions
    expect(query.params.TableName).toEqual('PODCAST');
    expect(query.params.Item).toEqual(expectedItem);
  });
});