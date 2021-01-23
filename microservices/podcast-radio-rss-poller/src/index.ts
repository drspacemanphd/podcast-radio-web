import _ from 'lodash';
import { URL } from 'url';
import { RssScraper } from '@drspacemanphd/podcast-radio-scrapers';

export async function handler(event: Record<string, any>): Promise<any> {
  if (_isEventInvalid(event)) {
    return;
  }

  const rssUrl = _.get(event, 'Records[0].OldImage["RSS_URL"]["S"]');

  return await RssScraper.scrape(new URL(rssUrl));
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

// test commit for dummy release