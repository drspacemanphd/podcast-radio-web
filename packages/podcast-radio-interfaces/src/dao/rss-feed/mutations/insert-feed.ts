import { RssFeed } from "@drspacemanphd/podcast-radio-model";

export interface IInsertFeed {
  insertFeed(feed: RssFeed): RssFeed | Promise<RssFeed>
}