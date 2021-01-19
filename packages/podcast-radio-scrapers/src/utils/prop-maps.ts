import { Podcast, Episode } from '@drspacemanphd/podcast-radio-model';

export interface PodcastProps {
  guid?: string,
  title?: string,
  author?: string,
  description?: string,
  categories?: Array<string>,
  imageUrl?: string,
}

export interface EpisodeProps {
  guid?: string,
  title?: string,
  author?: string,
  podcastId?: string,
  podcastTitle?: string,
  description?: string,
  audioUrl?: string,
  duration?: string,
  publicationDate?: string,
}