require('custom-env').env(process.env.NODE_ENV);

const { DynamoDB } = require('aws-sdk');
const express = require('express');

const { PodcastDao, RssScheduleDao } = require('../dist/index');

const { 
  CREATE_PODCAST_TABLE_PARAMS,
  CREATE_EPISODE_TABLE_PARAMS,
  CREATE_RSS_SCHEDULE_TABLE_PARAMS,
  UPDATE_RSS_SCHEDULE_TABLE_PARAMS,
  UPDATE_RSS_SCHEDULE_TABLE_TTL_PARAMS
} = require('../local-infrastructure/dynamo-db/table-definitions');

const { PODCASTS } = require('./podcast');
const { EPISODES } = require('./episode');
const { SCHEDULES } = require('./rss-schedule');

const client = new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });
const podcastDao = new PodcastDao();
const rssScheduleDao = new RssScheduleDao();

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
    await client.describeTable({ TableName: 'RSS_SCHEDULE' }).promise();
  } catch (err) {
    console.error(err.message);
    await initializeDB();
  }
}

async function initializeDB() {
  await client.createTable(CREATE_PODCAST_TABLE_PARAMS).promise()
  await client.createTable(CREATE_EPISODE_TABLE_PARAMS).promise();
  await client.createTable(CREATE_RSS_SCHEDULE_TABLE_PARAMS).promise()
  await client.updateTable(UPDATE_RSS_SCHEDULE_TABLE_PARAMS).promise()
  await client.updateTimeToLive(UPDATE_RSS_SCHEDULE_TABLE_TTL_PARAMS).promise();

  PODCASTS.forEach(async (p) => {
    await client.putItem(p).promise();
  });

  EPISODES.forEach(async (e) => {
    await client.putItem(e).promise();
  });

  SCHEDULES.forEach(async (r) => {
    await client.putItem(r).promise();
  });
}

function setupApi() {
  app.get('/podcast/author/:author', async (req, res) => {
    const author = req.params.author;
    const podcast = await podcastDao.getPodcastsByAuthor(author)
    res.json(podcast);
  });
  
  app.get('/podcast/:id', async (req, res) => {
    const id = req.params.id;
    const podcast = await podcastDao.getPodcastById(id);
    res.json(podcast);
  });
  
  app.get('/podcast/title/:title', async (req, res) => {
    const title = req.params.title;
    const podcast = await podcastDao.getPodcastsByTitle(title);
    res.json(podcast);
  });

  app.post('/podcast/new/', async (req, res) => {
    const podcast = await podcastDao.getPodcastById('12345');
    podcast.guid = '34567';
    await podcastDao.insertPodcast(podcast);
    const added = await podcastDao.getPodcastById('34567');
    res.json(added);
  });
  
  app.get('/episode/:id', async (req, res) => {
    const id = req.params.id;
    const episode = await podcastDao.getEpisodeById(id);
    res.json(episode);
  });
  
  app.get('/episode/podcast/:podcastId', async (req, res) => {
    const podcastId = req.params.podcastId;
    const episode = await podcastDao.getEpisodesByPodcast(podcastId);
    res.json(episode);
  });

  app.get('/rss-schedule/:id', async (req, res) => {
    const id = req.params.id;
    const rssSchedule = await rssScheduleDao.getRssScheduleById(id);
    res.json(rssSchedule);
  });

  app.post('/rss-schedule/', async (req, res) => {
    const url = req.body.url;
    const rssSchedule = await rssScheduleDao.getRssScheduleByUrl(url);
    res.json(rssSchedule);
  });
  
  app.listen(9000, () => {
    console.log('Listening');
  });
}

(async () => {
  await setup();
  console.log('BOOTSTRAP SUCCESSFUL');
})();