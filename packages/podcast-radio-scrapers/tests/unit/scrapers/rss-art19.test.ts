import got from 'got';
import { URL } from 'url';
import { scraper } from '../../../src/scrapers/rss-art19';

jest.mock('got');

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <atom:link href="https://feeds.simplecast.com/54nAGcIl" rel="self" title="MP3 Audio" type="application/atom+xml"/>
    <atom:link href="https://simplecast.superfeedr.com/" rel="hub" xmlns="http://www.w3.org/2005/Atom"/>
    <generator>https://simplecast.com</generator>
    <title>The Daily</title>
    <description>This is what the news should sound like. The biggest stories of our time, told by the best journalists in the world. Hosted by Michael Barbaro. Twenty minutes a day, five days a week, ready by 6 a.m.</description>
    <copyright>© 2020-2021 THE NEW YORK TIMES COMPANY; The New York Times encourages the use of RSS feeds for personal use in a news reader or as part of a non-commercial blog, subject to your agreement to our Terms of Service.</copyright>
    <language>en</language>
    <pubDate>Sun, 14 Feb 2021 14:00:00 +0000</pubDate>
    <lastBuildDate>Sun, 14 Feb 2021 14:00:11 +0000</lastBuildDate>
    <image>
      <link>https://www.nytimes.com/the-daily</link>
      <title>The Daily</title>
      <url>https://image.simplecastcdn.com/images/03d8b493-87fc-4bd1-931f-8a8e9b945d8a/2cce5659-f647-4366-b318-46e4b67afcfa/3000x3000/c81936f538106550b804e7e4fe2c236319bab7fba37941a6e8f7e5c3d3048b88fc5b2182fb790f7d446bdc820406456c94287f245db89d8656c105d5511ec3de.jpeg?aid=rss_feed</url>
    </image>
    <link>https://www.nytimes.com/the-daily</link>
    <itunes:type>episodic</itunes:type>
    <itunes:summary>This is what the news should sound like. The biggest stories of our time, told by the best journalists in the world. Hosted by Michael Barbaro. Twenty minutes a day, five days a week, ready by 6 a.m.</itunes:summary>
    <itunes:author>The New York Times</itunes:author>
    <itunes:explicit>no</itunes:explicit>
    <itunes:image href="https://image.simplecastcdn.com/images/03d8b493-87fc-4bd1-931f-8a8e9b945d8a/2cce5659-f647-4366-b318-46e4b67afcfa/3000x3000/c81936f538106550b804e7e4fe2c236319bab7fba37941a6e8f7e5c3d3048b88fc5b2182fb790f7d446bdc820406456c94287f245db89d8656c105d5511ec3de.jpeg?aid=rss_feed"/>
    <itunes:new-feed-url>https://feeds.simplecast.com/54nAGcIl</itunes:new-feed-url>
    <itunes:owner>
    <itunes:name>The New York Times</itunes:name>
    <itunes:email>thedaily@nytimes.com</itunes:email>
    </itunes:owner>
    <itunes:category text="News">
    <itunes:category text="Daily News"/></itunes:category>
    <item>
      <guid isPermaLink="false">9307f934-c79d-41eb-bf0e-93dbe7e9ac43</guid>
      <title>The Sunday Read: &apos;Who&apos;s Making All Those Scam Calls?&apos;</title>
      <description>
        <![CDATA[<p>The app Truecaller estimates that as many as 56 million Americans have fallen foul to scam calls, losing nearly $20 billion.</p><p>Enter L., an anonymous vigilante, referred to here by his middle initial, who seeks to expose and disrupt these scams, posting his work to a YouTube channel under the name “Jim Browning.”</p><p>On today’s Sunday Read, Yudhijit Bhattacharjee follows L.’s work and travels to India to understand the people and the forces behind these scams.</p><p><i>This story was written by <strong>Yudhijit Bhattacharje</strong></i><strong>e</strong><i> and recorded by Audm. To hear more audio stories from publishers like The New York Times, </i><a href="https://www.audm.com/?utm_source=nytmag&utm_medium=embed&utm_campaign=tracing_the_call_bhattacharjee" target="_blank"><i>download Audm for iPhone or Android.</i></a></p><p> </p>]]>
      </description>
      <pubDate>Sun, 14 Feb 2021 14:00:00 +0000</pubDate>
      <author>thedaily@nytimes.com (The New York Times)</author>
      <link>https://the-daily.simplecast.com/episodes/20210214-NxDsvp7L</link>
      <content:encoded>
        <![CDATA[<p>The app Truecaller estimates that as many as 56 million Americans have fallen foul to scam calls, losing nearly $20 billion.</p><p>Enter L., an anonymous vigilante, referred to here by his middle initial, who seeks to expose and disrupt these scams, posting his work to a YouTube channel under the name “Jim Browning.”</p><p>On today’s Sunday Read, Yudhijit Bhattacharjee follows L.’s work and travels to India to understand the people and the forces behind these scams.</p><p><i>This story was written by <strong>Yudhijit Bhattacharje</strong></i><strong>e</strong><i> and recorded by Audm. To hear more audio stories from publishers like The New York Times, </i><a href="https://www.audm.com/?utm_source=nytmag&utm_medium=embed&utm_campaign=tracing_the_call_bhattacharjee" target="_blank"><i>download Audm for iPhone or Android.</i></a></p><p> </p>]]>
      </content:encoded>
      <enclosure length="37585980" type="audio/mpeg" url="https://dts.podtrac.com/redirect.mp3/chtbl.com/track/8DB4DB/pdst.fm/e/nyt.simplecastaudio.com/03d8b493-87fc-4bd1-931f-8a8e9b945d8a/episodes/4f1ab0ac-863d-4e70-adb1-e3b2bc5bb5e1/audio/128/default.mp3?aid=rss_feed&amp;awCollectionId=03d8b493-87fc-4bd1-931f-8a8e9b945d8a&amp;awEpisodeId=4f1ab0ac-863d-4e70-adb1-e3b2bc5bb5e1&amp;feed=54nAGcIl"/>
      <itunes:title>The Sunday Read: &apos;Who&apos;s Making All Those Scam Calls?&apos;</itunes:title>
      <itunes:author>The New York Times</itunes:author>
      <itunes:duration>00:39:09</itunes:duration>
      <itunes:summary>The app Truecaller estimates that as many as 56 million Americans have fallen foul to scam calls, losing nearly $20 billion. 

Enter L., an anonymous vigilante, referred to here by his middle initial, who seeks to expose and disrupt these scams, posting his work to a YouTube channel under the name “Jim Browning.”

On today’s Sunday Read, Yudhijit Bhattacharjee follows L.’s work and travels to India to understand the people and the forces behind these scams. </itunes:summary>
      <itunes:subtitle>The app Truecaller estimates that as many as 56 million Americans have fallen foul to scam calls, losing nearly $20 billion. 

Enter L., an anonymous vigilante, referred to here by his middle initial, who seeks to expose and disrupt these scams, posting his work to a YouTube channel under the name “Jim Browning.”

On today’s Sunday Read, Yudhijit Bhattacharjee follows L.’s work and travels to India to understand the people and the forces behind these scams. </itunes:subtitle>
      <itunes:explicit>no</itunes:explicit>
      <itunes:episodeType>full</itunes:episodeType>
    </item>
    <item>
      <guid isPermaLink="false">37c11b75-b0a6-4365-af42-edbfa57eaed0</guid>
      <title>France, Islam and ‘Laïcité’</title>
      <description>
        <![CDATA[<p>“Laïcité,” or secularism, the principle that separates religion from the state in France, has long provoked heated dispute in the country. It has intensified recently, when a teacher, Samuel Paty, was beheaded after showing his class caricatures of the Prophet Muhammad.</p><p>We look at the roots of secularism and ask whether it works in modern, multicultural France.</p><p>Guest: <a href="https://www.nytimes.com/by/constant-meheut">Constant Méheut</a>, a reporter for The New York Times in France.</p><p>For an exclusive look at how the biggest stories on our show come together, <a href="https://www.nytimes.com/newsletters/the-daily?module=inline">subscribe to our newsletter</a>. You can read the latest edition<a href="https://www.nytimes.com/column/the-daily-newsletter">here</a>.</p><p>Background reading: </p><ul><li>For generations, public schools assimilated immigrant children into French society by instilling the nation’s ideals. The beheading of a teacher raised doubts about<a href="https://www.nytimes.com/2020/10/26/world/europe/france-beheading-teacher.html?searchResultPosition=6"> whether that model still worked</a>.</li></ul><p>For more information on today’s episode, visit </p><p><a href="http://nytimes.com/thedaily?smid=pc-thedaily">nytimes.com/thedaily.</a></p><p> Transcripts of each episode will be made available by the next workday.</p>
]]>
      </description>
      <pubDate>Fri, 12 Feb 2021 10:48:17 +0000</pubDate>
      <author>thedaily@nytimes.com (The New York Times)</author>
      <link>https://the-daily.simplecast.com/episodes/20210212-uYxop_Ko</link>
      <content:encoded>
        <![CDATA[<p>“Laïcité,” or secularism, the principle that separates religion from the state in France, has long provoked heated dispute in the country. It has intensified recently, when a teacher, Samuel Paty, was beheaded after showing his class caricatures of the Prophet Muhammad.</p><p>We look at the roots of secularism and ask whether it works in modern, multicultural France.</p><p>Guest: <a href="https://www.nytimes.com/by/constant-meheut">Constant Méheut</a>, a reporter for The New York Times in France.</p><p>For an exclusive look at how the biggest stories on our show come together, <a href="https://www.nytimes.com/newsletters/the-daily?module=inline">subscribe to our newsletter</a>. You can read the latest edition<a href="https://www.nytimes.com/column/the-daily-newsletter">here</a>.</p><p>Background reading: </p><ul><li>For generations, public schools assimilated immigrant children into French society by instilling the nation’s ideals. The beheading of a teacher raised doubts about<a href="https://www.nytimes.com/2020/10/26/world/europe/france-beheading-teacher.html?searchResultPosition=6"> whether that model still worked</a>.</li></ul><p>For more information on today’s episode, visit </p><p><a href="http://nytimes.com/thedaily?smid=pc-thedaily">nytimes.com/thedaily.</a></p><p> Transcripts of each episode will be made available by the next workday.</p>
]]>
      </content:encoded>
      <enclosure length="28872797" type="audio/mpeg" url="https://dts.podtrac.com/redirect.mp3/chtbl.com/track/8DB4DB/pdst.fm/e/nyt.simplecastaudio.com/03d8b493-87fc-4bd1-931f-8a8e9b945d8a/episodes/687ac691-ffd3-43ce-8597-7577cb1f0ce1/audio/128/default.mp3?aid=rss_feed&amp;awCollectionId=03d8b493-87fc-4bd1-931f-8a8e9b945d8a&amp;awEpisodeId=687ac691-ffd3-43ce-8597-7577cb1f0ce1&amp;feed=54nAGcIl"/>
      <itunes:title>France, Islam and ‘Laïcité’</itunes:title>
      <itunes:author>The New York Times</itunes:author>
      <itunes:duration>00:30:04</itunes:duration>
      <itunes:summary>“Laïcité,” or secularism, the principle that separates religion from the state in France, has long provoked heated dispute in the country. It has intensified recently, when a teacher, Samuel Paty, was beheaded after showing his class caricatures of the Prophet Muhammad.
We look at the roots of secularism and ask whether it works in modern, multicultural France.</itunes:summary>
      <itunes:subtitle>“Laïcité,” or secularism, the principle that separates religion from the state in France, has long provoked heated dispute in the country. It has intensified recently, when a teacher, Samuel Paty, was beheaded after showing his class caricatures of the Prophet Muhammad.
We look at the roots of secularism and ask whether it works in modern, multicultural France.</itunes:subtitle>
      <itunes:explicit>no</itunes:explicit>
      <itunes:episodeType>full</itunes:episodeType>
    </item>
  </channel>
</rss>
`

describe('rss-art19 scraper', () => {
  it('can properly scrape the rss feed', async () => {
    // Setup
    const url: URL = new URL('http://rss.art19.com');

    // Mock
    const mockGot: jest.Mock<any> = (<unknown> got) as jest.Mock<any>;
    mockGot.mockImplementation(() => ({
      text: () => xml
    }));

    // Test
    const scrape = scraper['rss.art19.com'];
    const { podcast, episodes } = await scrape(url, 5);

    // Assert
    expect(podcast).toBeDefined();
    expect(podcast.guid).toBeDefined();
    expect(podcast.title).toEqual('The Daily');
    expect(podcast.author).toEqual('The New York Times');
    expect(podcast.description).toBeDefined();
    expect(podcast.categories).toHaveLength(1);
    expect(podcast.categories[0]).toEqual('Daily News');
    expect(episodes).toBeDefined();
    expect(episodes).toHaveLength(2);
    expect(episodes[0].guid).toEqual('guid');
    expect(episodes[0].title).toEqual(`The Sunday Read: 'Who's Making All Those Scam Calls?'`);
    expect(episodes[0].author).toEqual('The New York Times');
    expect(episodes[0].podcastTitle).toEqual('The Daily');
    expect(episodes[0].podcastId).toEqual('guid');
    expect(episodes[0].description).toBeDefined();
    expect(episodes[0].duration).toEqual(2349);
    expect(episodes[0].publicationDate.getTime()).toEqual(1613311200000);
    expect(episodes[1].guid).toEqual('guid');
    expect(episodes[1].title).toEqual(`France, Islam and ‘Laïcité’`);
    expect(episodes[1].author).toEqual('The New York Times');
    expect(episodes[1].podcastTitle).toEqual('The Daily');
    expect(episodes[1].podcastId).toEqual('guid');
    expect(episodes[1].description).toBeDefined();
    expect(episodes[1].duration).toEqual(1804);
    expect(episodes[1].publicationDate.getTime()).toEqual(1613126897000);
  });
});