import { AWSError, SQS } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { IQueuePusher } from "@drspacemanphd/podcast-radio-interfaces";
import { Episode } from "@drspacemanphd/podcast-radio-model";
import { configure } from "../config/sqs";

export class EpisodeUpdatePusher implements IQueuePusher<Episode, any> {
  private queue: SQS;
  private queueUrl: string;

  constructor(config: Record<string, any>) {
    this.queue = configure({
      endpoint: config.endpoint || process.env.SQS_ENDPOINT,
      region: config.region || process.env.SQS_REGION
    });
    this.queueUrl = config.queueUrl || process.env.EPISODE_UPDATE_QUEUE_URL
  }

  async push(episode: Episode): Promise<PromiseResult<SQS.SendMessageResult, AWSError>> {
    return await this.queue.sendMessage({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(episode                                                                                     )
    }).promise();
  }
}

