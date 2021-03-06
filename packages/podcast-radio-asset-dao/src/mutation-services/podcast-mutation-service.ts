import got from 'got';
import { URL } from 'url';
import { IUpdatePodcastImageFromUrl } from '@drspacemanphd/podcast-radio-interfaces';
import { UploadAssetRunner } from '../runners/streamified-upload-runner';
import { getMutation as getSaveImageParams } from '../mutations/podcast-image/save-podcast-image';

export class PodcastMutationService implements IUpdatePodcastImageFromUrl<Promise<string>> {
  private streamRunner: UploadAssetRunner;

  constructor(streamRunner: UploadAssetRunner) {
    this.streamRunner = streamRunner;
  }

  async updatePodcastImageFromUrl(podcastId: string, url: string | URL) {
    const query = getSaveImageParams(podcastId, got.stream(url));
    await this.streamRunner.run(query);
    return query.params.Key;
  }
}