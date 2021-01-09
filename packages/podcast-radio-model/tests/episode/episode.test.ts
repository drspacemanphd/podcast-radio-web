import Episode from '../../src/episode/episode';

describe('Episode', () => {
  test('can be constructed', () => {
    const d = new Date();
  
    const episode: Episode = new Episode(
      'guid',
      'title',
      'author',
      'podcastId',
      'podcastTitle',
      'description',
      'audioUrl',
      1000,
      d,
      5,
      ['keyword 1'],
      ['tag 1'],
    );
    expect(episode).toBeDefined();
    expect(episode.guid).toEqual('guid');
    expect(episode.title).toEqual('title');
    expect(episode.author).toEqual('author');
    expect(episode.podcastId).toEqual('podcastId');
    expect(episode.podcastTitle).toEqual('podcastTitle');
    expect(episode.description).toEqual('description');
    expect(episode.audioUrl).toEqual('audioUrl');
    expect(episode.duration).toEqual(1000);
    expect(episode.publicationDate).toEqual(d);
    expect(episode.playCount).toEqual(5);
    expect(episode.keywords).toEqual(['keyword 1']);
    expect(episode.tags).toEqual(['tag 1']);
  });

  test('can be copied', () => {
    const d = new Date();
  
    const input: Episode = new Episode(
      'guid',
      'title',
      'author',
      'podcastId',
      'podcastTitle',
      'description',
      'audioUrl',
      1000,
      d,
      5,
      ['keyword 1'],
      ['tag 1'],
    );

    const output: Episode = Episode.copy(input);

    expect(output).toEqual(input);
  });

  test('can be determined if instance of episode', () => {
    const d = new Date();
  
    const inputOne: Episode = new Episode(
      'guid',
      'title',
      'author',
      'podcastId',
      'podcastTitle',
      'description',
      'audioUrl',
      1000,
      d,
      5,
      ['keyword 1'],
      ['tag 1'],
    );

    const inputTwo: Episode = new Episode(
      'guid',
      'title',
      'author',
      'podcastId',
      'podcastTitle',
      'description',
      'audioUrl',
      1000,
      d,
      5
    );

    const inputThree: any = {
      guid: 'guid',
      title: 'title',
      author: 'author',
      description: 'description',
      categories: ['category 1']
    }

    const inputFour: any = undefined;

    const isEpisodeOne = Episode.isEpisode(inputOne);
    const isEpisodeTwo = Episode.isEpisode(inputTwo);
    const isEpisodeThree = Episode.isEpisode(inputThree);
    const isEpisodeFour = Episode.isEpisode(inputFour);

    expect(isEpisodeOne).toBeTruthy();
    expect(isEpisodeTwo).toBeTruthy();
    expect(isEpisodeThree).toBeFalsy();
    expect(isEpisodeFour).toBeFalsy();
  });

  test('can be properly tested for equality', () => {
    const d = new Date();
  
    const input: Episode = new Episode(
      'guid',
      'title',
      'author',
      'podcastId',
      'podcastTitle',
      'description',
      'audioUrl',
      1000,
      d,
      5,
      ['keyword 1', 'keyword 2'],
      ['tag 1', 'tag 2'],
    );

    const testOne: Episode = new Episode(
      'guid',
      'title',
      'author',
      'podcastId',
      'podcastTitle',
      'description',
      'audioUrl',
      1000,
      d,
      5,
      ['keyword 1', 'keyword 2'],
      ['tag 1', 'tag 2'],
    );

    const testTwo: any = new Episode(
      'guid',
      'title',
      'author',
      'podcastId',
      'podcastTitle',
      'description',
      'audioUrl',
      1000,
      d,
      5,
      ['keyword 1', 'keyword 2'],
      ['tag 1', 'tag 2'],
    );
    testTwo.dummyProp = 123;

    const testThree: any = {
      guid: 'guid',
      title: 'title',
      author: 'author',
      podcastId: 'podcastId',
      podcastTtitle: 'podcastTitle',
      description: 'description',
      audioUrl: 'audioUrl',
      duration: 1000,
      publicationDate: d,
      playCount: 5,
      keywords: ['keyword 1', 'keyword 2'],
      tags: ['tag 1', 'tag 2'],
    }

    const testFour: Episode = new Episode(
      'guid',
      'title',
      'author',
      'podcastId',
      'podcastTitle',
      'description',
      'audioUrl 2',
      1000,
      d,
      5,
      ['keyword 1', 'keyword 2'],
      ['tag 1', 'tag 2'],
    );

    const testFive: Episode = new Episode(
      'guid',
      'title',
      'author',
      'podcastId',
      'podcastTitle',
      'description',
      'audioUrl',
      1000,
      d,
      5,
      ['keyword 2', 'keyword 1'],
      ['tag 1', 'tag 2'],
    );

    const testSix: Episode = new Episode(
      'guid',
      'title',
      'author',
      'podcastId',
      'podcastTitle',
      'description',
      'audioUrl',
      1000,
      d,
      5,
      ['keyword 1', 'keyword 2'],
      ['tag 2', 'tag 1'],
    );

    const testSeven: Episode = new Episode(
      'guid',
      'title',
      'author',
      'podcastId',
      'podcastTitle',
      'description',
      'audioUrl',
      1000,
      d,
      5
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
