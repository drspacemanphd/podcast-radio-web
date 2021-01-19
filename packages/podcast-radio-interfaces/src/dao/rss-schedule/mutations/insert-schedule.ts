import { RssSchedule } from "@drspacemanphd/podcast-radio-model";

export interface IInsertRssSchedule {
  insertRssSchedule(feed: RssSchedule): RssSchedule | Promise<RssSchedule>
}