import _ from 'lodash';
import { RssScheduleDao } from '@drspacemanphd/podcast-radio-podcast-dao'

export async function handler(event: Record<string, any>): Promise<any> {
  return null;
}

function _isEventInvalid(event: Record<string, any>): boolean {
  const record = _.get(event, 'Records[0]', {});
  
  if (record.eventType !== 'REMOVE') {
    return true;
  }

  const rssUrl = _.get(record, 'OldImage["RSS_URL"]["S"]', null);

  if (!rssUrl) {
    console.log(`RSS_URL of ${rssUrl} NOT VALID`);
    return true
  }

  return false;
}