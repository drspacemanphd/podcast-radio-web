export default class RssSchedule {
  guid: string;
  podcastId: string;
  url: string;
  cronSchedule: string;
  nextStartSecs: number;

  constructor(
    guid: string,
    podcastId: string,
    url: string,
    cronSchedule: string,
    nextStartSecs: number = 1609459199 
  ) {
    this.guid = guid,
    this.podcastId = podcastId
    this.url = url;
    this.cronSchedule = cronSchedule;
    this.nextStartSecs = nextStartSecs
  }
}