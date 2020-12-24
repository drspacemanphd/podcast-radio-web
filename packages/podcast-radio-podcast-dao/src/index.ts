import { configureDynamoDB } from './config/dynamo-db';

import { EpisodeQueryService as EQS } from './query-services/episode-query-service';
import { PodcastQueryService as PQS } from './query-services/podcast-query-service';
import { DynamoDBEpisodeQueryRunner } from './query-runner/episode-query-runner';
import { DynamoDBPodcastQueryRunner } from './query-runner/podcast-query-runner';

import { EpisodeMutationService as EMS } from './mutation-services/episode-mutation-service';
import { PodcastMutationService as PMS } from './mutation-services/podcast-mutation-service';
import { DynamoDBEpisodeMutationRunner } from './mutation-runner/episode-mutation-runner';
import { DynamoDBPodcastMutationRunner } from './mutation-runner/podcast-mutation-runner';

const env = process.env;

const dynamoDB = configureDynamoDB(env);

const podcastQueryRunner = new DynamoDBPodcastQueryRunner(dynamoDB);
const episodeQueryRunner = new DynamoDBEpisodeQueryRunner(dynamoDB);
const podcastMutationRunner = new DynamoDBPodcastMutationRunner(dynamoDB);
const episodeMutationRunner = new DynamoDBEpisodeMutationRunner(dynamoDB);

export const PodcastQueryService = new PQS(podcastQueryRunner);
export const EpisodeQueryService = new EQS(episodeQueryRunner);
export const PodcastMutationService = new PMS(podcastMutationRunner);
export const EpisodeMutationService = new EMS(episodeMutationRunner);
