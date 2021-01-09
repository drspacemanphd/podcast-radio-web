import { IPodcastRadioDao } from '@drspacemanphd/podcast-radio-interfaces';
import { Podcast, Episode, RssFeed } from '@drspacemanphd/podcast-radio-model';

import { configureDynamoDB } from './config/dynamo-db';

import { EpisodeQueryService } from './query-services/episode-query-service';
import { PodcastQueryService } from './query-services/podcast-query-service';
import { RssFeedQueryService } from './query-services/rss-feed-query-service';
import { DynamoDBQueryRunner } from './runners/query-runner';

import { EpisodeMutationService } from './mutation-services/episode-mutation-service';
import { PodcastMutationService } from './mutation-services/podcast-mutation-service';
import { RssFeedMutationService } from './mutation-services/rss-feed-mutation-service';
import { DynamoDBPutRunner } from './runners/put-runner';

export class PodcastRadioDao implements IPodcastRadioDao {
  podcastQueryService: PodcastQueryService;
  episodeQueryService: EpisodeQueryService;
  rssFeedQueryService: RssFeedQueryService;

  podcastMutationService: PodcastMutationService;
  episodeMutationService: EpisodeMutationService;
  rssFeedMutationService: RssFeedMutationService;

  constructor(config = { endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION }) {
    const db = configureDynamoDB(config);
    const queryRunner = new DynamoDBQueryRunner(db);
    const putRunner = new DynamoDBPutRunner(db);

    this.podcastQueryService = new PodcastQueryService(queryRunner);
    this.episodeQueryService = new EpisodeQueryService(queryRunner);
    this.rssFeedQueryService = new RssFeedQueryService(queryRunner);

    this.podcastMutationService = new PodcastMutationService(putRunner);
    this.episodeMutationService = new EpisodeMutationService(putRunner);
    this.rssFeedMutationService = new RssFeedMutationService(putRunner);
  }

  getPodcastById(id: string) {
    return this.podcastQueryService.getPodcastById(id);
  }

  getPodcastsByAuthor(author: string) {
    return this.podcastQueryService.getPodcastsByAuthor(author);
  }

  getPodcastsByTitle(title: string) {
    return this.podcastQueryService.getPodcastsByTitle(title);
  }

  getEpisodeById(id: string) {
    return this.episodeQueryService.getEpisodeById(id);
  }

  getEpisodesByPodcast(podcastId: string) {
    return this.episodeQueryService.getEpisodesByPodcast(podcastId);
  }

  getRssFeedById(id: string) {
    return this.rssFeedQueryService.getRssFeedById(id);
  }

  getRssFeedByUrl(url: string) {
    return this.rssFeedQueryService.getRssFeedByUrl(url);
  }

  insertPodcast(podcast: Podcast) {
    return this.podcastMutationService.insertPodcast(podcast);
  }

  insertEpisode(episode: Episode) {
    return this.episodeMutationService.insertEpisode(episode);
  }

  insertRssFeed(rssFeed: RssFeed) {
    return this.rssFeedMutationService.insertRssFeed(rssFeed);
  }
}
