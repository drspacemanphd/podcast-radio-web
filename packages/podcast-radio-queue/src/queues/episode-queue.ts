import { SendMessageResult } from "aws-sdk/clients/sqs";
import { PromiseResult } from "aws-sdk/lib/request";
import { AWSError } from "aws-sdk";
import { Episode } from "@drspacemanphd/podcast-radio-model";
import { EpisodeUpdatePusher } from "../episode/episode-update-pusher";

export class EpisodeQueue {
  private episodeUpdatePusher: EpisodeUpdatePusher;

  constructor(config: Record<string, any>) {    
    this.episodeUpdatePusher = new EpisodeUpdatePusher(
      {
        endpoint: config.endpoint || process.env.SQS_ENDPOINT,
        region: config.region || process.env.SQS_REGION,
        queueUrl: config.episodeUpdateQueueUrl || process.env.EPISODE_UPDATE_QUEUE_URL
      }
    );
  }

  async pushEpisodeUpdate(episode: Episode): Promise<PromiseResult<SendMessageResult, AWSError>> {
    return await this.episodeUpdatePusher.push(episode);
  }
}

