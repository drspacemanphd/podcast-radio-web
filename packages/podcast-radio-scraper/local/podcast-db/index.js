require('custom-env').env(process.env.NODE_ENV);

const { DynamoDB } = require('aws-sdk');
const express = require('express')
const { PodcastQueryService, EpisodeQueryService, PodcastMutationService, EpisodeMutationService } = require('@drspacemanphd/podcast-radio-podcast-dao');

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
    const podcast = await PodcastQueryService.getByAuthor(author);
    res.json(podcast);
  });
  
  app.get('/podcast/:id', async (req, res) => {
    const id = req.params.id;
    const podcast = await PodcastQueryService.getById(id);
    res.json(podcast);
  });
  
  app.get('/podcast/title/:title', async (req, res) => {
    const title = req.params.title;
    const podcast = await PodcastQueryService.getByTitle(title);
    res.json(podcast);
  });

  app.post('/podcast/new/', async (req, res) => {
    const podcast = await PodcastQueryService.getById('12345');
    podcast.guid = '34567';
    await PodcastMutationService.insertPodcast(podcast);
    const added = await PodcastQueryService.getById('34567');
    res.json(added);
  });
  
  app.get('/episode/:id', async (req, res) => {
    const id = req.params.id;
    const episode = await EpisodeQueryService.getEpisode(id);
    res.json(episode);
  });
  
  app.get('/episode/podcast/:podcastId', async (req, res) => {
    const podcastId = req.params.podcastId;
    const episode = await EpisodeQueryService.getByPodcast(podcastId);
    res.json(episode);
  });

  app.get('/episode/podcast/:podcastId', async (req, res) => {
    const podcastId = req.params.podcastId;
    const episode = await EpisodeQueryService.getByPodcast(podcastId);
    res.json(episode);
  });
  
  app.post('/episode/new/', async (req, res) => {
    const episode = await EpisodeQueryService.getById('12345');
    episode.guid = '34567';
    await EpisodeMutationService.insertEpisode(episode);
    const added = await EpisodeQueryService.getById('34567');
    res.json(added);
  });

  app.listen(9000, () => {
    console.log('Listening');
  });
}

(async () => {
  await setup();
  console.log('BOOTSTRAP SUCCESSFUL');
})();