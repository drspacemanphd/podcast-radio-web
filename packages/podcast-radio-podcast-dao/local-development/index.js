require('custom-env').env(process.env.NODE_ENV);

const { DynamoDB } = require('aws-sdk');
const express = require('express');

const { PodcastRadioDao } = require('../dist/index');

const { 
  CREATE_PODCAST_TABLE_PARAMS,
  CREATE_EPISODE_TABLE_PARAMS,
  CREATE_RSS_FEED_TABLE_PARAMS, 
  UPDATE_RSS_FEED_TABLE_TTL_PARAMS
} = require('../local-infrastructure/table-definitions');

const { PODCASTS } = require('./podcast');
const { EPISODES } = require('./episode');
const { FEEDS } = require('./rss-feed');

const client = new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
const dao = new PodcastRadioDao();

const app = express();
app.use(express.json());

async function setup() {
  await bootstrapDB();
  setupApi();
}

async function bootstrapDB() {
  try {
    await client.describeTable({ TableName: 'PODCAST' }).promise();
    await client.describeTable({ TableName: 'EPISODE' }).promise();
    await client.describeTable({ TableName: 'RSS_FEED' }).promise();
  } catch (err) {
    console.error(err.message);
    await initializeDB();
  }
}

async function initializeDB() {
  await client.createTable(CREATE_PODCAST_TABLE_PARAMS).promise()
  await client.createTable(CREATE_EPISODE_TABLE_PARAMS).promise();
  await client.createTable(CREATE_RSS_FEED_TABLE_PARAMS).promise()
  await client.updateTimeToLive(UPDATE_RSS_FEED_TABLE_TTL_PARAMS).promise();

  PODCASTS.forEach(async (p) => {
    await client.putItem(p).promise();
  });

  EPISODES.forEach(async (e) => {
    await client.putItem(e).promise();
  });

  FEEDS.forEach(async (r) => {
    await client.putItem(r).promise();
  });
}

function setupApi() {
  app.get('/podcast/author/:author', async (req, res) => {
    const author = req.params.author;
    const podcast = await dao.getPodcastsByAuthor(author)
    res.json(podcast);
  });
  
  app.get('/podcast/:id', async (req, res) => {
    const id = req.params.id;
    const podcast = await dao.getPodcastById(id);
    res.json(podcast);
  });
  
  app.get('/podcast/title/:title', async (req, res) => {
    const title = req.params.title;
    const podcast = await dao.getPodcastsByTitle(title);
    res.json(podcast);
  });

  app.post('/podcast/new/', async (req, res) => {
    const podcast = await dao.getPodcastById('12345');
    podcast.guid = '34567';
    await dao.insertPodcast(podcast);
    const added = await dao.getPodcastById('34567');
    res.json(added);
  });
  
  app.get('/episode/:id', async (req, res) => {
    const id = req.params.id;
    const episode = await dao.getEpisodeById(id);
    res.json(episode);
  });
  
  app.get('/episode/podcast/:podcastId', async (req, res) => {
    const podcastId = req.params.podcastId;
    const episode = await dao.getEpisodesByPodcast(podcastId);
    res.json(episode);
  });

  app.get('/rss/:id', async (req, res) => {
    const id = req.params.id;
    const rssFeed = await dao.getRssFeedById(id);
    res.json(rssFeed);
  });

  app.post('/rss/', async (req, res) => {
    const url = req.body.url;
    const rssFeed = await dao.getRssFeedByUrl(url);
    res.json(rssFeed);
  });
  
  app.listen(9000, () => {
    console.log('Listening');
  });
}

(async () => {
  await setup();
  console.log('BOOTSTRAP SUCCESSFUL');
})();