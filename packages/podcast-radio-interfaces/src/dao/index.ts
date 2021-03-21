import { IGetEpisodeById, IGetEpisodeByPodcast, IInsertEpisode } from './episode';
import { IGetPodcastByAuthor, IGetPodcastById, IGetPodcastByTitle, IInsertPodcast } from './podcast';
import { IGetRssScheduleById, IGetRssScheduleByUrl, IInsertRssSchedule } from './rss-schedule';

export * from './podcast';
export * from './episode';
export * from './rss-schedule';
export * from './asset';

export interface IPodcastDao extends 
  IGetPodcastById, IGetPodcastByTitle, IGetPodcastByAuthor, IInsertPodcast,
  IGetEpisodeById, IGetEpisodeByPodcast, IInsertEpisode {}

export interface IRssScheduleDao extends
  IGetRssScheduleById, IGetRssScheduleByUrl, IInsertRssSchedule {}