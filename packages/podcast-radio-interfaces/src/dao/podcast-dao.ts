import { Podcast } from '@drspacemanphd/podcast-radio-model';

export default interface IPodcastDao {
  getPodcast(id: string, opts?: Record<string, unknown>): Podcast;

  getByCategory(category: string, opts?: Record<string, unknown>): Podcast[];

  getByTitle(title: string, opts?: Record<string, unknown>): Podcast[];

  getByAuthor(author: string, opts?: Record<string, unknown>): Podcast[];
}
