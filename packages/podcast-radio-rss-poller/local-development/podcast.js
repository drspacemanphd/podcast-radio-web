const PODCAST_ONE = {
  TableName: 'PODCAST',
  Item: {
    'GUID': {
      S: '12345'
    },
    'TITLE': {
      S: 'The Daily'
    },
    'AUTHOR': {
      S: 'The New York Times'
    },
    'DESCRIPTION': {
      S: 'A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION'
    },
    'CATEGORIES': {
      SS: ['Politics', 'News', 'Daily']
    },
    'IMAGE_URL': {
      S: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts114/v4/93/cf/99/93cf9960-fff3-205e-6655-72c03ddeccb2/mza_10545582232493904175.jpeg/600x600bb.jpg'
    },
    'KEYWORDS': {
      SS: ['Daily', 'News', 'Politics']
    },
    'TAGS': {
      SS: ['NYT', 'PODCAST', 'TIMES']
    }
  }
};

const PODCAST_TWO = {
  TableName: 'PODCAST',
  Item: {
    'GUID': {
      S: '23456'
    },
    'TITLE': {
      S: 'Pod Save America'
    },
    'AUTHOR': {
      S: 'Crooked Media'
    },
    'DESCRIPTION': {
      S: 'A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION, A DESCRIPTION'
    },
    'CATEGORIES': {
      SS: ['Politics', 'Crooked']
    },
    'IMAGE_URL': {
      S: 'https://is3-ssl.mzstatic.com/image/thumb/Music118/v4/cc/96/de/cc96de50-f978-80f6-6be3-26d41369a10b/source/100x100bb.jpg'
    },
    'KEYWORDS': {
      SS: ['Crooked', 'Politics']
    },
    'TAGS': {
      SS: ['Pod Save America', 'PODCAST']
    }
  }
};

const PODCASTS = [PODCAST_ONE, PODCAST_TWO];

module.exports = {
  PODCASTS,
};
