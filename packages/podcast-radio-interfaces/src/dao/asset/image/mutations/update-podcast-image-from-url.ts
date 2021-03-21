import { URL } from 'url';

export interface IUpdatePodcastImageFromUrl<T> {
  updatePodcastImageFromUrl(podcasId: string, url: string | URL, opts?: Record<string, any>): T
}