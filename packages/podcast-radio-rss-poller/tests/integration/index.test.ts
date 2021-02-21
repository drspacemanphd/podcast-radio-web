import { RssSchedule } from '@drspacemanphd/podcast-radio-model';
import { RssScheduleDao } from '@drspacemanphd/podcast-radio-podcast-dao';
import { startScanner as startDeleteScanner } from './delete';

describe('Rss Poller', () => {
  it('can successfully poll for a single new episode', async () => {
      // Setup       
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
      const podEntries: RssSchedule[] = await rssDao.getRssScheduleByUrl('http://rss.art19.com/the-daily');
      expect(podEntries).toBeDefined();
      expect(podEntries).toHaveLength(2);
      const podLastEntry = podEntries.filter(r => r.nextStartSecs === 253402300799);
      expect(podLastEntry).toBeDefined();
      const podEarlyEntry = podEntries.filter(r => r.nextStartSecs < fiveMinsFromNowSecs);
      expect(podEarlyEntry).toBeDefined();

      // Start rss schedule entry delete process
      const deleteProcess = await startDeleteScanner();

      // Wait for rss schedule entries to be deleted and replaced
      console.log(`starting sleep at ${new Date()}`);
      await sleep(0.5);
      console.log(`ending sleep at ${new Date()}`);

      clearTimeout(deleteProcess);
  });
});

async function sleep(mins: number) {
  return new Promise(resolve => {
    return setTimeout(resolve, 60 * 1000 * mins);
  });
}