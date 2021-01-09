const EPISODE_ONE = {
  TableName: 'EPISODE',
  Item: {
    'GUID': {
      S: '12345'
    },
    'TITLE': {
      S: 'A Guide to Georgia\'s Senate Runoffs'
    },
    'AUTHOR': {
      S: 'The New York Times'
    },
    'PODCAST_ID': {
      S: '12345'
    },
    'PODCAST_TITLE': {
      S: 'The Daily'
    },
    'DESCRIPTION': {
      S: 'In three weeks, an election will take place that could be as important as the presidential vote in determining the course of the next four years.</p><p>The Jan. 5 runoff elections in Georgia will determine whether two Republican senators, David Perdue and Kelly Loeffler, keep their seats. If their Democratic challengers, Jon Ossoff and the Rev. Raphael Warnock, both win, Democrats would claim control of the Senate, giving President-Elect Joe Biden expanded power to realize his policy agenda. Today, we offer a guide to the two Senate races in Georgia.'
    },
    'AUDIO_URL': {
      S: 'https://dts.podtrac.com/redirect.mp3/chtbl.com/track/8DB4DB/rss.art19.com/episodes/4fac47c0-7e56-4fa9-a233-f76c90bc55ed.mp3'
    },
    'PUBLICATION_DATE': {
      N: '1607712554000'
    },
    'DURATION': {
      N: '3600'
    },
    'PLAY_COUNT': {
      N: '0'
    },
    'KEYWORDS': {
      SS: ['Daily', 'News', 'Politics']
    },
    'TAGS': {
      SS: ['NYT', 'PODCAST', 'TIMES']
    }
  }
};

const EPISODE_TWO = {
  TableName: 'EPISODE',
  Item: {
    'GUID': {
      S: '23456'
    },
    'TITLE': {
      S: 'The Mitch Who Stole Christmas'
    },
    'AUTHOR': {
      S: 'Crooked Media'
    },
    'PODCAST_ID': {
      S: '23456'
    },
    'PODCAST_TITLE': {
      S: 'Pod Save America'
    },
    'DESCRIPTION': {
      S: 'Mitch McConnell blocks bipartisan pandemic relief to help his corporate pals, Joe Biden continues to staff up his Cabinet and White House, and Republicans run their 2020 playbook in Georgia. Then messaging expert Anat Shenker-Osorio talks to Jon about why Democrats need to stop selling the recipe and start selling the brownie. Learn more about your ad choices. Visit podcastchoices.com/adchoices'
    },
    'AUDIO_URL': {
      S: 'https://traffic.megaphone.fm/DGT7555925469.mp3'
    },
    'PUBLICATION_DATE': {
      N: '1607626154000'
    },
    'DURATION': {
      N: '3600'
    },
    'PLAY_COUNT': {
      N: '0'
    },
    'KEYWORDS': {
      SS: ['Crooked', 'Politics']
    },
    'TAGS': {
      SS: ['Pod Save America', 'PODCAST']
    }
  }
};

const EPISODES = [EPISODE_ONE, EPISODE_TWO];

module.exports = {
  EPISODES,
};