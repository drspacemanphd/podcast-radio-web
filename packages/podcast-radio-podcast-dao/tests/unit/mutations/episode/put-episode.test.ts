import { DynamoDB } from 'aws-sdk';
import { IQuery } from '@drspacemanphd/podcast-radio-interfaces';
import { Episode } from '@drspacemanphd/podcast-radio-model';
import { getMutation as putEpisode } from '../../../../src/mutations/episode/put-episode';

describe('Mutation', () => {
  test('is correct', () => {
    // Setup
    const episode = new Episode('12345', 'A_TITLE', 'AN_AUTHOR', 'A PODCAST', 'A PODCAST TITLE', 'A_DESCRIPTION', 'AUDIO URL', 1000, new Date(10000), 3, ['A keyword'], ['a tag']);
    const expectedItem = {
      'GUID': '12345',
      'TITLE': 'A_TITLE',
      'AUTHOR': 'AN_AUTHOR',
      'PODCAST_ID': 'A PODCAST',
      'PODCAST_TITLE': 'A PODCAST TITLE',
      'DESCRIPTION': 'A_DESCRIPTION',
      'AUDIO_URL': 'AUDIO URL',
      'DURATION': 1000,
      'PUBLICATION_DATE': 10000,
      'PLAY_COUNT': 3,
      'KEYWORDS': ['A keyword'],
      'TAGS': ['a tag']
    }

    // Test
    const query: IQuery<DynamoDB.DocumentClient.PutItemInput> = putEpisode(episode);

    // Assertions
    expect(query.params.TableName).toEqual('EPISODE');
    expect(query.params.Item).toEqual(expectedItem);
  });
});