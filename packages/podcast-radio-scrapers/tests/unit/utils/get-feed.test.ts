import got from 'got';
import xmljs from 'xml-js';
import { URL } from 'url';
import { getFeed } from '../../../src/utils/get-feed';

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" media="screen" href="/~d/styles/rss2full.xsl"?>
<?xml-stylesheet type="text/css" media="screen" href="http://feeds.feedburner.com/~d/styles/itemcontent.css"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
  <channel>
    <title>Lovett or Leave It</title>
    <link>https://crooked.com/</link>
    <language>en</language>
    <copyright>© Crooked Media. All Rights Reserved.</copyright>
    <description>Former Obama speechwriter Jon Lovett and a panel of comedians, actors, journalists, and some of the many famous Friends of the Pod appear before a live audience to break down the week’s biggest news. Quizzes! Impressions! Shouting at cable news clips! And everyone’s favorite: nuanced discussion. New episodes every Saturday.</description>
    <image>
      <url>https://images.megaphone.fm/pfzwtx2gImhQWv8OFhgW2L7gpPA5LkIb42GtIUcdWeY/plain/s3://megaphone-prod/podcasts/4aded07a-0f0a-11e9-b524-777a62b36ee0/image/d1035e7749e81bcfb524d679029eab7e977d16641bf208f04cc1c1b020bdf0da57bb8db2833a1cf4c60e061024af8497fc264c457814e80719956558401618e4.jpeg</url>
      <title>Lovett or Leave It</title>
      <link>https://crooked.com/</link>
    </image>
    <itunes:explicit>yes</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    <itunes:subtitle />
    <itunes:author>Crooked Media</itunes:author>
    <itunes:summary>Former Obama speechwriter Jon Lovett and a panel of comedians, actors, journalists, and some of the many famous Friends of the Pod appear before a live audience to break down the week’s biggest news. Quizzes! Impressions! Shouting at cable news clips! And everyone’s favorite: nuanced discussion. New episodes every Saturday.</itunes:summary>
    <content:encoded>
      <![CDATA[<p>Former Obama speechwriter Jon Lovett and a panel of comedians, actors, journalists, and some of the many famous Friends of the Pod appear before a live audience to break down the week’s biggest news. Quizzes! Impressions! Shouting at cable news clips! And everyone’s favorite: nuanced discussion. New episodes every Saturday.</p>]]>
    </content:encoded>
    <itunes:owner>
      <itunes:name />
      <itunes:email>hey@crooked.com</itunes:email>
    </itunes:owner>
    <itunes:image href="https://images.megaphone.fm/pfzwtx2gImhQWv8OFhgW2L7gpPA5LkIb42GtIUcdWeY/plain/s3://megaphone-prod/podcasts/4aded07a-0f0a-11e9-b524-777a62b36ee0/image/d1035e7749e81bcfb524d679029eab7e977d16641bf208f04cc1c1b020bdf0da57bb8db2833a1cf4c60e061024af8497fc264c457814e80719956558401618e4.jpeg" />
    <itunes:category text="News">
    </itunes:category>
    <itunes:category text="Comedy">
    </itunes:category>
    <atom10:link xmlns:atom10="http://www.w3.org/2005/Atom" rel="self" type="application/rss+xml" href="http://feeds.feedburner.com/lovett-or-leave-it" />
    <feedburner:info xmlns:feedburner="http://rssnamespace.org/feedburner/ext/1.0" uri="lovett-or-leave-it" />
    <atom10:link xmlns:atom10="http://www.w3.org/2005/Atom" rel="hub" href="http://pubsubhubbub.appspot.com/" />
    <item>
      <title>Insurrection: Exclusive Bonus Footage</title>
      <description>The evidence is damning but the defendant got lucky on jury selection. The vaccine roll out continues. And Gina Carano can't act OR tweet. Akilah Hughes joins to break down the week's news. Dr. Atul Gawande discusses mask mandates and vexing variants. And, to mark Valentine's Day in a pandemic, several contestants compete for LOVE in speed dates with our writer Pallavi Gunalan.
Learn more about your ad choices. Visit podcastchoices.com/adchoices</description>
      <pubDate>Sat, 13 Feb 2021 11:00:00 -0000</pubDate>
      <itunes:title>Insurrection: Exclusive Bonus Footage</itunes:title>
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:author>Crooked Media</itunes:author>
      <itunes:subtitle />
      <itunes:summary>The evidence is damning but the defendant got lucky on jury selection. The vaccine roll out continues. And Gina Carano can't act OR tweet. Akilah Hughes joins to break down the week's news. Dr. Atul Gawande discusses mask mandates and vexing variants. And, to mark Valentine's Day in a pandemic, several contestants compete for LOVE in speed dates with our writer Pallavi Gunalan.
Learn more about your ad choices. Visit podcastchoices.com/adchoices</itunes:summary>
      <content:encoded>
        <![CDATA[<p>The evidence is damning but the defendant got lucky on jury selection. The vaccine roll out continues. And Gina Carano can't act OR tweet. Akilah Hughes joins to break down the week's news. Dr. Atul Gawande discusses mask mandates and vexing variants. And, to mark Valentine's Day in a pandemic, several contestants compete for LOVE in speed dates with our writer Pallavi Gunalan.</p><p> </p><p>Learn more about your ad choices. Visit <a href="https://podcastchoices.com/adchoices">podcastchoices.com/adchoices</a></p>]]>
      </content:encoded>
      <itunes:duration>5638</itunes:duration>
      <guid isPermaLink="false">
        <![CDATA[8a92e018-d366-11ea-b67f-1f86cb575e7c]]>
      </guid>
      <enclosure url="https://pdst.fm/e/chtbl.com/track/479722/traffic.megaphone.fm/DGT9366974712.mp3" length="0" type="audio/mpeg" />
    </item>
  </channel>
</rss>
`

jest.mock('got');

describe('get feed function', () => {
  it('successfully fetches feed and parses xml', async () => {
    // Setup
    const url = new URL('http://test.com');

    // Mock
    const mockGot: jest.Mock<any> = (<unknown> got) as jest.Mock<any>;
    mockGot.mockImplementation(() => {
      return {
        text: () => xml
      };
    });

    // Test
    const feed = await getFeed(url);

    // Assert
    expect(got).toHaveBeenCalledWith(url, { timeout: 4000, retry: 3 });
    expect(typeof feed).toEqual('object')
  });

  it('throws error when the fetch fails', async () => {
    // Setup
    const url = new URL('http://test.com');

    // Mock
    const mockGot: jest.Mock<any> = (<unknown> got) as jest.Mock<any>;
    mockGot.mockImplementation(() => {
      throw new Error('FETCH ERROR');
    });

    // Test
    try {
      await getFeed(url);
      throw new Error();
    } catch (err) {
      expect(got).toHaveBeenCalledWith(url, { timeout: 4000, retry: 3 });
      expect(err.message).toEqual('FETCH ERROR');
    }
  });

  it('throws error when the parsing fails', async () => {
    // Setup
    const url = new URL('http://test.com');

    // Mock
    const mockGot: jest.Mock<any> = (<unknown> got) as jest.Mock<any>;
    mockGot.mockImplementation(() => {
      return {
        text: () => xml
      };
    });

    jest.spyOn(xmljs, 'xml2json').mockImplementation(() => {
      throw new Error('PARSING ERROR');
    })

    // Test
    try {
      await getFeed(url);
      throw new Error();
    } catch (err) {
      expect(got).toHaveBeenCalledWith(url, { timeout: 4000, retry: 3 });
      expect(err.message).toEqual('PARSING ERROR');
    }
  });
});