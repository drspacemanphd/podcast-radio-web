import { configureDynamoDB } from './config/dynamo-db';
import { IEpisodeDao } from './dao/episode-dao';
import { IPodcastDao } from './dao/podcast-dao';
import { DynamoDBEpisodeQueryRunner } from './query-runner/episode-query-runner';
import { DynamoDBPodcastQueryRunner } from './query-runner/podcast-query-runner';

const env = process.env;

const dynamoDB = configureDynamoDB(env);

const podcastQueryRunner = new DynamoDBPodcastQueryRunner(dynamoDB);
const episodeQueryRunner = new DynamoDBEpisodeQueryRunner(dynamoDB);

const PodcastDao = new IPodcastDao(podcastQueryRunner);
const EpisodeDao = new IEpisodeDao(episodeQueryRunner);

export {
  PodcastDao,
  EpisodeDao
}