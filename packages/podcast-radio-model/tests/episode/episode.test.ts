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
});
