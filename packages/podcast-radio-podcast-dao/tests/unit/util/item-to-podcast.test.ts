import { Podcast } from '@drspacemanphd/podcast-radio-model';
import { itemToPodcast } from '../../../src/util/item-to-podcast';

describe('Item To Podcast function', () => {
  it('can convert a dynamodb item to function', () => {
    // Setup
    const item: any = {
      'GUID': '12345',
      'TITLE': 'A_TITLE',
      'AUTHOR': 'AN_AUTHOR',
      'DESCRIPTION': 'A_DESCRIPTION',
      'CATEGORIES': ['A CAT'],
      'IMAGE_URL': 'An image url',
      'KEYWORDS': ['A keyword'],
      'TAGS': ['a tag']
    }

    const expectedPodcast = new Podcast('12345', 'A_TITLE', 'AN_AUTHOR', 'A_DESCRIPTION', ['A CAT'], 'An image url', ['A keyword'], ['a tag']);
  
    // Test
    const actualPodcast = itemToPodcast(item);
  
    // Assertions
    expect(expectedPodcast).toEqual(actualPodcast);
  });
});