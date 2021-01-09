import { Episode } from '@drspacemanphd/podcast-radio-model';
import { itemToEpisode } from '../../../src/util/item-to-episode';

describe('Item To Episode function', () => {
  it('can convert a dynamodb item to function', () => {
    // Setup
    const item: any = {
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

    const expectedEpisode = new Episode('12345', 'A_TITLE', 'AN_AUTHOR', 'A PODCAST', 'A PODCAST TITLE', 'A_DESCRIPTION', 'AUDIO URL', 1000, new Date(10000), 3, ['A keyword'], ['a tag']);
  
    // Test
    const actualEpisode = itemToEpisode(item);
  
    // Assertions
    expect(expectedEpisode).toEqual(actualEpisode);
  });
});