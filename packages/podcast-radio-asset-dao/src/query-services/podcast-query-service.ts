import { Readable } from 'stream';
import { IGetPodcastImageByPodcastId } from '@drspacemanphd/podcast-radio-interfaces';
import { GetObjectRunner } from '../runners/streamified-get-object-runner';
import { getQuery as getImageByPodcastId } from '../queries/podcast-image/get-from-podcast-id';

export class PodcastQueryService implements IGetPodcastImageByPodcastId<Readable> {
  private runner: GetObjectRunner;

  constructor(runner: GetObjectRunner) {
    this.runner = runner;
  }

  getPodcastImageByPodcastId(podcastId: string): Readable {
    return this.runner.run(getImageByPodcastId(podcastId));
  }
}