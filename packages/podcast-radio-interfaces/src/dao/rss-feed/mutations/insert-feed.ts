import { RssFeed } from "@drspacemanphd/podcast-radio-model";

export interface IInsertRssFeed {
  insertRssFeed(feed: RssFeed): RssFeed | Promise<RssFeed>
}