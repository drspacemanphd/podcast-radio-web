import { IGetEpisodeByCategory, IGetEpisodeById, IGetEpisodeByPodcast, IQueryRunner } from '@drspacemanphd/podcast-radio-interfaces';
import { Episode } from '@drspacemanphd/podcast-radio-model';

export class IEpisodeDao implements IGetEpisodeById, IGetEpisodeByPodcast, IGetEpisodeByCategory {
  private queryRunner: IQueryRunner<Episode[]>;

  constructor(queryRunner: IQueryRunner<Episode[]>) {
    this.queryRunner = queryRunner
  }

  getEpisode(id: string): Episode {
    throw new Error('Method not implemented.');
  }

  getByPodcast(podcastId: string): Episode[] {
    throw new Error('Method not implemented.');
  }

  getByCategory(podcastId: string): Episode[] {
    throw new Error('Method not implemented.');
  }

}