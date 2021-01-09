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

  test('can be determined if instance of podcast', () => {
    const inputOne: Podcast = new Podcast(
      'guid',
      'title',
      'author',
      'description',
      ['category 1'],
      'image-url',
      ['keyword 1'],
      ['tag 1'],
    );

    const inputTwo: Podcast = new Podcast(
      'guid',
      'title',
      'author',
      'description',
      ['category 1']
    );

    const inputThree: any = {
      guid: 'guid',
      title: 'title',
      author: 'author',
      description: 'description',
      categories: ['category 1']
    }

    const inputFour: any = undefined;

    const isPodcastOne = Podcast.isPodcast(inputOne);
    const isPodcastTwo = Podcast.isPodcast(inputTwo);
    const isPodcastThree = Podcast.isPodcast(inputThree);
    const isPodcastFour = Podcast.isPodcast(inputFour);

    expect(isPodcastOne).toBeTruthy();
    expect(isPodcastTwo).toBeTruthy();
    expect(isPodcastThree).toBeFalsy();
    expect(isPodcastFour).toBeFalsy();
  });

  test('can be properly tested for equality', () => {
    const input: Podcast = new Podcast(
      'guid',
      'title',
      'author',
      'description',
      ['category 1'],
      'image-url',
      ['keyword 1', 'keyword 2'],
      ['tag 1', 'tag 2'],
    );

    const testOne: Podcast = new Podcast(
      'guid',
      'title',
      'author',
      'description',
      ['category 1'],
      'image-url',
      ['keyword 1', 'keyword 2'],
      ['tag 1', 'tag 2'],
    );

    const testTwo: any = new Podcast(
      'guid',
      'title',
      'author',
      'description',
      ['category 1'],
      'image-url',
      ['keyword 1', 'keyword 2'],
      ['tag 1', 'tag 2'],
    );
    testTwo.dummyProp = 123;

    const testThree: any = {
      guid: 'guid',
      title: 'title',
      author: 'author',
      description: 'description',
      categories: ['category 1'],
      imageUrl: 'image-url',
      keywords: ['keyword 1', 'keyword 2'],
      tags: ['tag 1', 'tag 2'],
    }

    const testFour: Podcast = new Podcast(
      'guid',
      'title',
      'author',
      'description',
      ['category 1'],
      'image-url 2',
      ['keyword 1', 'keyword 2'],
      ['tag 1', 'tag 2'],
    );

    const testFive: Podcast = new Podcast(
      'guid',
      'title',
      'author',
      'description',
      ['category 1'],
      'image-url',
      ['keyword 2', 'keyword 1'],
      ['tag 1', 'tag 2'],
    );

    const testSix: Podcast = new Podcast(
      'guid',
      'title',
      'author',
      'description',
      ['category 1'],
      'image-url',
      ['keyword 1', 'keyword 2'],
      ['tag 2', 'tag 1'],
    );

    const testSeven: Podcast = new Podcast(
      'guid',
      'title',
      'author',
      'description',
      ['category 1']
    );

    const testEight: any = null;

    const isEqualOne = input.equals(testOne)
    const isEqualTwo = input.equals(testTwo)
    const isEqualThree = input.equals(testThree)
    const isEqualFour = input.equals(testFour)
    const isEqualFive = input.equals(testFive)
    const isEqualSix = input.equals(testSix)
    const isEqualSeven = input.equals(testSeven)
    const isEqualEight = input.equals(testEight)
  
    expect(isEqualOne).toBeTruthy();
    expect(isEqualTwo).toBeTruthy();
    expect(isEqualThree).toBeFalsy();
    expect(isEqualFour).toBeFalsy();
    expect(isEqualFive).toBeFalsy();
    expect(isEqualSix).toBeFalsy();
    expect(isEqualSeven).toBeFalsy();
    expect(isEqualEight).toBeFalsy();
  });
});
