require('custom-env').env(process.env.NODE_ENV);

const fs = require('fs');
const { DynamoDB, Lambda, S3, DynamoDBStreams } = require('aws-sdk');
const express = require('express');

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
const lambda = new Lambda({ endpoint: process.env.LAMBDA_ENDPOINT, region: process.env.LAMBDA_REGION })
const s3 = new S3({ endpoint: process.env.S3_ENDPOINT, s3ForcePathStyle: true, region: process.env.S3_REGION });
const dbStream = new DynamoDBStreams({ endpoint: process.env.S3_ENDPOINT, region: process.env.S3_REGION });

const app = express();
app.use(express.json());

async function setup() {
  await bootstrapDB();
  await setupBucket();
  await uploadFunction();
  await deployFunction();
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

async function setupBucket() {
  try {
    const result = await s3.createBucket({
      Bucket: 'podcast-radio-lambdas',
      ACL: 'public-read-write'
    }).promise();
    console.log('SUCCESSFULLY CREATED BUCKET');
  } catch (err) {
    console.log(`ERROR CREATING BUCKET: ${err.message}`);
    throw err;
  }
}

async function uploadFunction() {
  try {
    const result = await s3.upload({
      ACL: 'public-read-write',
      Bucket: 'podcast-radio-lambdas',
      Body: fs.createReadStream('./local-development/lambda.zip'),
      Key: 'lambda.zip'
    }).promise();
    console.log('SUCCESSFULLY UPLOADED FUNCTION');
  } catch (err) {
    console.log(`ERROR UPLOADING FUNCTION: ${err.message}`);
    throw err;
  }
}

async function deployFunction() {
  try {
    await lambda.createFunction({ 
      FunctionName: 'podcast-radio-rss-poller',
      Runtime: 'nodejs12.x',
      Role: 'rss-poller-role',
      Handler: 'index.handler',
      Timeout: 60,
      MemorySize: 256,
      Code: {
        S3Bucket: 'podcast-radio-lambdas',
        S3Key: 'lambda.zip'
      },
      Environment: {
        Variables: {
          DYNAMODB_ENDPOINT: 'http://localstack:4566',
          DYNAMODB_REGION: 'us-east-1',
          NODE_ENV: 'local'
        }
      }
    }).promise();
    console.log('SUCCESSFULLY DEPLOYED FUNCTION');

    console.log(dbStream);
    const streamsResult = await dbStream.listStreams({ TableName: 'RSS_SCHEDULE', Limit: 1 }).promise();
    const streamARN = streamsResult.Streams[0].StreamArn;

    console.log('SUCCESSFULLY GOT STREAM');
    console.log(streamARN);

    await lambda.createEventSourceMapping({ 
      FunctionName: 'podcast-radio-rss-poller',
      EventSourceArn: streamARN,
      Enabled: true,
      BatchSize: 1
    }).promise();

    console.log('EVENT_SOURCE_SUCCESSFULLY_MAPPED');

    await setScanner();
  } catch (err) {
    console.log(err);
    console.log(`ERROR DEPLOYING FUNCTION: ${err.message}`);
    throw err;
  }
}

async function setScanner() {
  return setTimeout(async () => {
    await scan();
    return setTimeout(setScanner, 2000);
  });
}

async function scan() {
  const result = await client.scan({ TableName: 'RSS_SCHEDULE' }).promise();
  const promises = [];
  const now = new Date().getTime();
  result.Items.forEach(item => {
    if (item.NEXT_START['N'] * 1000 < now) {
      console.log(`DELETING ${item.GUID['S']}`);
      promises.push(client.deleteItem({ TableName: 'RSS_SCHEDULE', Key: { GUID: { 'S': item.GUID['S'] } } }).promise());
    }
  });
  await Promise.all(promises);
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