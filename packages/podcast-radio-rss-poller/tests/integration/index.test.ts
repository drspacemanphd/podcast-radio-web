import { RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { RssScheduleDao } from '@drspacemanphd/podcast-radio-podcast-dao';
import { startScanner as startDeleteScanner } from './delete';

describe('Rss Poller', () => {
  it('can successfully poll for a single new episode', async () => {
      // Setup 
      const deadline: number = new Date().getTime() + (60 * 1000 * parseInt(process.env.TEST_TIMEOUT_MINS));
      
      const fiveMinsFromNowSecs: number = Math.trunc((new Date().getTime() + (60 * 1000 * 5)) / 1000);
      const rssDao: RssScheduleDao = new RssScheduleDao({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
      
      // First assert that correct entries are present
      const dailyEntries: RssSchedule[] = await rssDao.getRssScheduleByUrl('http://rss.art19.com/the-daily');
      expect(dailyEntries).toBeDefined();
      expect(dailyEntries).toHaveLength(2);
      const dailyLastEntry = dailyEntries.filter(r => r.nextStartSecs === 253402300799);
      expect(dailyLastEntry).toBeDefined();
      const dailyEarlyEntry = dailyEntries.filter(r => r.nextStartSecs < fiveMinsFromNowSecs);
      expect(dailyEarlyEntry).toBeDefined();
  });
});