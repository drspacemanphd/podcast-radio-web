import { IGetEpisodeById, IGetEpisodeByPodcast, IInsertEpisode } from './episode';
import { IGetPodcastByAuthor, IGetPodcastById, IGetPodcastByTitle, IInsertPodcast } from './podcast';
import { IGetRssFeedById, IGetRssFeedByUrl, IInsertRssFeed } from './rss-feed';

export * from './podcast';
export * from './episode';
export * from './rss-feed';

export interface IPodcastRadioDao extends 
  IGetPodcastById, IGetPodcastByTitle, IGetPodcastByAuthor, IInsertPodcast,
  IGetEpisodeById, IGetEpisodeByPodcast, IInsertEpisode,
  IGetRssFeedById, IGetRssFeedByUrl, IInsertRssFeed {}