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

  public static isPodcast(input: Record<string, any>): boolean {
    return input && input instanceof Podcast;
  }

  public equals(podcast: Record<string, any>): boolean {
    return podcast && Podcast.isPodcast(podcast) && Object.entries(this).reduce((result: boolean, entry: [string, any]) => {
      const corresponding: any = podcast[entry[0]];

      if (!result) {
        return false;
      } else if (Array.isArray(entry[1])) {
        return Array.isArray(corresponding) && corresponding.length === entry[1].length &&
          entry[1].every((val: any, index: number) => {
            return corresponding[index] === val;
          });
      } else {
        return corresponding === entry[1];
      }
    }, true);
  }
}
