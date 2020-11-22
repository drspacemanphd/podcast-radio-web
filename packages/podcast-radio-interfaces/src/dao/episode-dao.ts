import { Episode } from '@drspacemanphd/podcast-radio-model';

export default interface IEpisodeDao {
  getEpisode(id: string, opts?: Record<string, unknown>): Episode;
}
