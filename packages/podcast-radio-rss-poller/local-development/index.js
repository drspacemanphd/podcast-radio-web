require('custom-env').env(process.env.NODE_ENV);

const { DynamoDB } = require('aws-sdk');
const express = require('express');

const { PodcastRadioDao } = require('../dist/index');

const { 
  CREATE_PODCAST_TABLE_PARAMS,
  CREATE_EPISODE_TABLE_PARAMS,
  CREATE_RSS_FEED_TABLE_PARAMS,
  UPDATE_RSS_FEED_TABLE_PARAMS,
  UPDATE_RSS_FEED_TABLE_TTL_PARAMS
} = require('../local-infrastructure/dynamo-db/table-definitions');

const { PODCASTS } = require('./podcast');
const { EPISODES } = require('./episode');
const { FEEDS } = require('./rss-feed');

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
  await client.updateTable(UPDATE_RSS_FEED_TABLE_PARAMS).promise()
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
  app.listen(9000, () => {
    console.log('Listening');
  });
}

(async () => {
  await setup();
  console.log('BOOTSTRAP SUCCESSFUL');
})();