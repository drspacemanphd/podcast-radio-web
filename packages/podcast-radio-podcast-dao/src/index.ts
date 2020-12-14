import { configureDynamoDB } from './config/dynamo-db';
import { EpisodeDao as EDao } from './dao/episode-dao';
import { PodcastDao as PDao } from './dao/podcast-dao';
import { DynamoDBEpisodeQueryRunner } from './query-runner/episode-query-runner';
import { DynamoDBPodcastQueryRunner } from './query-runner/podcast-query-runner';

const env = process.env;

const dynamoDB = configureDynamoDB(env);

const podcastQueryRunner = new DynamoDBPodcastQueryRunner(dynamoDB);
const episodeQueryRunner = new DynamoDBEpisodeQueryRunner(dynamoDB);

export const PodcastDao = new PDao(podcastQueryRunner);
export const EpisodeDao = new EDao(episodeQueryRunner);