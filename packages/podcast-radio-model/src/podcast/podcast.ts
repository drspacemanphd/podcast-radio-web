export default class Podcast {
  guid: string;
  title: string;
  author: string;
  description: string;
  categories: Array<string>;
  imageUrl?: string;
  keywords?: Array<string>;
  tags?: Array<string>;

  constructor(
    guid: string,
    title: string,
    author: string,
    description: string,
    categories: Array<string>,
    imageUrl?: string,
    keywords?: Array<string>,
    tags?: Array<string>,
  ) {
    this.guid = guid;
    this.title = title;
    this.author = author;
    this.description = description;
    this.categories = categories;
    this.imageUrl = imageUrl;
    this.keywords = keywords;
    this.tags = tags;
  }

  public static copy(podcast: Podcast): Podcast {
    return new Podcast(
      podcast.guid,
      podcast.title,
      podcast.author,
      podcast.description,
      podcast.categories,
      podcast.imageUrl,
      podcast.keywords,
      podcast.tags,
    );
  }
}
