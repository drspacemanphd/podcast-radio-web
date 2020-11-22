export default class Episode {
  guid: string;
  title: string;
  author: string;
  podcastId: string;
  podcastTitle: string;
  description: string;
  audioUrl: string
  duration: number;
  publicationDate: Date;
  playCount: number;
  keywords?: Array<string>;
  tags?: Array<string>;

  constructor(
    guid: string,
    title: string,
    author: string,
    podcastId: string,
    podcastTitle: string,
    description: string,
    audioUrl: string,
    duration: number,
    publicationDate: Date,
    playCount: number,
    keywords?: Array<string>,
    tags?: Array<string>,
  ) {
    this.guid = guid;
    this.title = title;
    this.author = author;
    this.podcastId = podcastId;
    this.podcastTitle = podcastTitle;
    this.description = description;
    this.audioUrl = audioUrl;
    this.duration = duration;
    this.publicationDate = publicationDate;
    this.playCount = playCount;
    this.keywords = keywords;
    this.tags = tags;
  }
  
  public static copy(episode: Episode): Episode {
    return new Episode(
      episode.guid,
      episode.title,
      episode.author,
      episode.podcastId,
      episode.podcastTitle,
      episode.description,
      episode.audioUrl,
      episode.duration,
      episode.publicationDate,
      episode.playCount,
      episode.keywords,
      episode.tags,
    );
  }
}