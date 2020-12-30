import { configureDynamoDB } from './config/dynamo-db';

import { EpisodeQueryService as EQS } from './query-services/episode-query-service';
import { PodcastQueryService as PQS } from './query-services/podcast-query-service';
import { DynamoDBQueryRunner } from './runners/query-runner';

import { EpisodeMutationService as EMS } from './mutation-services/episode-mutation-service';
import { PodcastMutationService as PMS } from './mutation-services/podcast-mutation-service';
import { DynamoDBPutRunner } from './runners/put-runner';

const env = process.env;

const dynamoDB = configureDynamoDB(env);

const queryRunner = new DynamoDBQueryRunner(dynamoDB);
const putRunner = new DynamoDBPutRunner(dynamoDB);

export const PodcastQueryService = new PQS(queryRunner);
export const EpisodeQueryService = new EQS(queryRunner);
export const PodcastMutationService = new PMS(putRunner);
export const EpisodeMutationService = new EMS(putRunner);
