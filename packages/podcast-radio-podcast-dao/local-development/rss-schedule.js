const RSS_SCHEDULE_ONE = {
  TableName: 'RSS_SCHEDULE',
  Item: {
    'GUID': {
      S: '12345'
    },
    'RSS_URL': {
      S: 'http://feeds.feedburner.com/pod-save-america'
    },
    'CRON': {
      S: '*/15 * * * *'
    },
    'NEXT_START': {
      N: Math.trunc(new Date('9999-12-31').getTime() / 1000).toString()
    }
  }
}

const RSS_SCHEDULE_TWO = {
  TableName: 'RSS_SCHEDULE',
  Item: {
    'GUID': {
      S: '23456'
    },
    'RSS_URL': {
      S: 'http://feeds.feedburner.com/pod-save-america'
    },
    'CRON': {
      S: '*/15 * * * *'
    },
    'NEXT_START': {
      N: Math.trunc((new Date().getTime() / 1000) + 60).toString()
    }
  }
}

const RSS_SCHEDULE_THREE = {
  TableName: 'RSS_SCHEDULE',
  Item: {
    'GUID': {
      S: '34567'
    },
    'RSS_URL': {
      S: 'http://rss.art19.com/the-daily'
    },
    'CRON': {
      S: '*/15 * * * *'
    },
    'NEXT_START': {
      N: Math.trunc(new Date('9999-12-31').getTime() / 1000).toString()
    }
  }
}

const RSS_SCHEDULE_FOUR = {
  TableName: 'RSS_SCHEDULE',
  Item: {
    'GUID': {
      S: '45678'
    },
    'RSS_URL': {
      S: 'http://rss.art19.com/the-daily'
    },
    'CRON': {
      S: '*/15 * * * *'
    },
    'NEXT_START': {
      N: Math.trunc((new Date().getTime() / 1000) + 180).toString()
    }
  }
}

module.exports = {
  SCHEDULES: [RSS_SCHEDULE_ONE, RSS_SCHEDULE_TWO, RSS_SCHEDULE_THREE, RSS_SCHEDULE_FOUR]
}