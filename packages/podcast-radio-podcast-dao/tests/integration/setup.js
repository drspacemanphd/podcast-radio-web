require('custom-env').env(process.env.NODE_ENV);

const { DynamoDB } = require('aws-sdk');
const { 
  CREATE_PODCAST_TABLE_PARAMS,
  CREATE_EPISODE_TABLE_PARAMS, 
  CREATE_RSS_FEED_TABLE_PARAMS,
  UPDATE_RSS_FEED_TABLE_TTL_PARAMS
} = require('./fixtures/table-definitions');

const { PODCASTS } = require('./fixtures/podcasts');
const { EPISODES } = require('./fixtures/episodes');
const { FEEDS } = require('./fixtures/rss-feeds');

const db = new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });

async function setup() {
  try {
    await db.deleteTable({ TableName: CREATE_EPISODE_TABLE_PARAMS.TableName });
    await db.deleteTable({ TableName: CREATE_EPISODE_TABLE_PARAMS.TableName });
    await db.deleteTable({ TableName: CREATE_RSS_FEED_TABLE_PARAMS.TableName });
  } catch(err) {
    console.log('Tables may not be created, proceeding.');
  }

  await db.createTable(CREATE_PODCAST_TABLE_PARAMS).promise();
  await db.createTable(CREATE_EPISODE_TABLE_PARAMS).promise();
  await db.createTable(CREATE_RSS_FEED_TABLE_PARAMS).promise();

  const podcasts = PODCASTS.map(p => db.putItem(p).promise());
  const episodes = EPISODES.map(e => db.putItem(e).promise());
  const rssFeeds = FEEDS.map(f => db.putItem(f).promise());

  await Promise.all(podcasts);
  await Promise.all(episodes);
  await Promise.all(rssFeeds);
};

module.exports = setup;