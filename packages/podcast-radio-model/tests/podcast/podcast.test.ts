import Podcast from '../../src/podcast/podcast';

describe('Podcast', () => {
  test('can be constructed', () => {
    const podcast: Podcast = new Podcast(
      'guid',
      'title',
      'author',
      'description',
      ['category 1'],
      'image-url',
      ['keyword 1'],
      ['tag 1'],
    );
    expect(podcast).toBeDefined();
    expect(podcast.guid).toEqual('guid');
    expect(podcast.title).toEqual('title');
    expect(podcast.author).toEqual('author');
    expect(podcast.description).toEqual('description');
    expect(podcast.categories).toEqual(['category 1']);
    expect(podcast.imageUrl).toEqual('image-url');
    expect(podcast.keywords).toEqual(['keyword 1']);
    expect(podcast.tags).toEqual(['tag 1']);
  });

  test('can be copied', () => {
    const input: Podcast = new Podcast(
      'guid',
      'title',
      'author',
      'description',
      ['category 1'],
      'image-url',
      ['keyword 1'],
      ['tag 1'],
    );

    const podcast: Podcast = Podcast.copy(input);

    expect(podcast).toEqual(input);
  });
});
