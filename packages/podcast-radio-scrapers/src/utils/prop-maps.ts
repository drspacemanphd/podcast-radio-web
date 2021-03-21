export interface PodcastProps {
  guid?: string,
  title?: string,
  author?: string,
  description?: string,
  categories?: Array<string>,
  image?: string,
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