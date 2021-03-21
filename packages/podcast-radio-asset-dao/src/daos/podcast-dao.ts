import { Readable } from 'stream';
import { URL } from "url"
import { IGetPodcastImageByPodcastId, IUpdatePodcastImageFromUrl } from "@drspacemanphd/podcast-radio-interfaces";
import { PodcastMutationService } from "../mutation-services/podcast-mutation-service";
import { PodcastQueryService } from "../query-services/podcast-query-service";
import { configureS3 } from '../config/configure-s3';
import { GetObjectRunner } from '../runners/streamified-get-object-runner';
import { UploadAssetRunner } from '../runners/streamified-upload-runner';

export class PodcastDao implements IGetPodcastImageByPodcastId<Readable>, IUpdatePodcastImageFromUrl<string> {
  private queryService: PodcastQueryService;
  private mutationService: PodcastMutationService;

  constructor(config = { endpoint: process.env.S3_ENDPOINT, region: process.env.S3_REGION }) {
    const s3 = configureS3(config);
    const getObjectRunner = new GetObjectRunner(s3);
    const uploadRunner = new UploadAssetRunner(s3);

    this.queryService = new PodcastQueryService(getObjectRunner);
    this.mutationService = new PodcastMutationService(uploadRunner);
  }

  getPodcastImageByPodcastId(podcastId: string): Readable {
    return this.queryService.getPodcastImageByPodcastId(podcastId);
  }

  updatePodcastImageFromUrl(podcastId: string, url: string | URL): string {
    return this.mutationService.updatePodcastImageFromUrl(podcastId, url);
  }
}