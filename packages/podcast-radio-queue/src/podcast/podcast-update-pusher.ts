import { AWSError, SQS } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { IQueuePusher } from "@drspacemanphd/podcast-radio-interfaces";
import { Podcast } from "@drspacemanphd/podcast-radio-model";
import { configure } from "../config/sqs";

export class PodcastUpdatePusher implements IQueuePusher<Podcast, any> {
  private queue: SQS;
  private queueUrl: string;

  constructor(config: Record<string, any>) {
    this.queue = configure({
      endpoint: config.endpoint || process.env.SQS_ENDPOINT,
      region: config.region || process.env.SQS_REGION
    });
    this.queueUrl = config.queueUrl || process.env.PODCAST_UPDATE_QUEUE_URL
  }

  async push(podcast: Podcast): Promise<PromiseResult<SQS.SendMessageResult, AWSError>> {
    return await this.queue.sendMessage({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(podcast)
    }).promise();
  }
}

