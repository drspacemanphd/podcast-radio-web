import { SendMessageResult } from "aws-sdk/clients/sqs";
import { PromiseResult } from "aws-sdk/lib/request";
import { AWSError } from "aws-sdk";
import { Podcast } from "@drspacemanphd/podcast-radio-model";
import { PodcastUpdatePusher } from "../podcast/podcast-update-pusher";

export class PodcastQueue {
  private podcastUpdatePusher: PodcastUpdatePusher;

  constructor(config: Record<string, any>) {    
    this.podcastUpdatePusher = new PodcastUpdatePusher(
      {
        endpoint: config.endpoint || process.env.SQS_ENDPOINT,
        region: config.region || process.env.SQS_REGION,
        queueUrl: config.podcastUpdateQueueUrl || process.env.PODCAST_UPDATE_QUEUE_URL
      }
    );
  }

  async pushPodcastUpdate(podcast: Podcast): Promise<PromiseResult<SendMessageResult, AWSError>> {
    return await this.podcastUpdatePusher.push(podcast);
  }
}

