export default class RssFeed {
  guid: string;
  url: string;
  cronSchedule: string;
  nextStartSecs: number;

  constructor(
    guid: string,
    url: string,
    cronSchedule: string,
    nextStartSecs: number = 1609459199 
  ) {
    this.guid = guid,
    this.url = url;
    this.cronSchedule = cronSchedule;
    this.nextStartSecs = nextStartSecs
  }
}