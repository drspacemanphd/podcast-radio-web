import { DynamoDB } from 'aws-sdk';

const client = new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT, region: process.env.DYNAMODB_REGION });

export async function startScanner() {
  return setTimeout(async () => {
    console.log('SCANNING');
    await scan();
    return setTimeout(startScanner, 2000);
  });
}

async function scan() {
  const result = await client.scan({ TableName: 'RSS_SCHEDULE' }).promise();
  const promises = [];
  const now = new Date().getTime();
  result.Items.forEach(item => {
    const nextStart: number = (<unknown> item.NEXT_START['N']) as number;
    if (nextStart * 1000 < now) {
      console.log(`DELETING ${item.GUID['S']}`);
      promises.push(client.deleteItem({ TableName: 'RSS_SCHEDULE', Key: { GUID: { 'S': item.GUID['S'] } } }).promise());
    }
  });
  await Promise.all(promises);
}