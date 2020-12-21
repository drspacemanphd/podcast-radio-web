require('custom-env').env(process.env.NODE_ENV);

const { DynamoDB } = require('aws-sdk');
const express = require('express');

const { PodcastDao, EpisodeDao } = require('../dist/index');
const { CREATE_PODCAST_TABLE_PARAMS, CREATE_EPISODE_TABLE_PARAMS, PODCASTS, EPISODES } = require('./local-db-fixtures');

const client = new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });

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
  } catch (err) {
    console.error(err.message);
    await initializeDB();
  }
}

async function initializeDB() {
  await client.createTable(CREATE_PODCAST_TABLE_PARAMS).promise()
  await client.createTable(CREATE_EPISODE_TABLE_PARAMS).promise();

  PODCASTS.forEach(async (p) => {
    await client.putItem(p).promise();
  });

  EPISODES.forEach(async (e) => {
    await client.putItem(e).promise();
  });
}

function setupApi() {
  app.get('/podcast/author/:author', async (req, res) => {
    const author = req.params.author;
    const podcast = await PodcastDao.getByAuthor(author);
    res.json(podcast);
  });
  
  app.get('/podcast/:id', async (req, res) => {
    const id = req.params.id;
    const podcast = await PodcastDao.getById(id);
    res.json(podcast);
  });
  
  app.get('/podcast/title/:title', async (req, res) => {
    const title = req.params.title;
    const podcast = await PodcastDao.getByTitle(title);
    res.json(podcast);
  });
  
  app.get('/episode/:id', async (req, res) => {
    const id = req.params.id;
    const episode = await EpisodeDao.getEpisode(id);
    res.json(episode);
  });
  
  app.get('/episode/podcast/:podcastId', async (req, res) => {
    const podcastId = req.params.podcastId;
    const episode = await EpisodeDao.getByPodcast(podcastId);
    res.json(episode);
  });
  
  app.listen(9000, () => {
    console.log('Listening');
  });
}

(async () => {
  await setup();
  console.log('BOOTSTRAP SUCCESSFUL');
})();