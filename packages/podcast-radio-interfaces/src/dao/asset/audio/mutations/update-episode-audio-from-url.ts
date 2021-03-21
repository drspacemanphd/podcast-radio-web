import { URL } from 'url';

export interface IUpdateEpisodeAudioFromUrl<T> {
  updateEpisodeAudioFromUrl(podcastId: string, episodeId: string, url: string | URL): T
}