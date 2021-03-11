// require('custom-env').env('integration')

// import { SQS } from 'aws-sdk';
// import { Podcast } from '@drspacemanphd/podcast-radio-model';
// import { PodcastQueue } from '@drspacemanphd/podcast-radio-queue';
// import { PodcastDao } from '@drspacemanphd/podcast-radio-podcast-dao';

// async function run () {
//   const queue = new PodcastQueue({
//     endpoint: process.env.SQS_ENDPOINT,
//     region: process.env.SQS_REGION,
//     podcastUpdateQueueUrl: process.env.PODCAST_UPDATE_QUEUE_URL
//   });

//   const podcasts: Podcast[] = [] as Podcast[];

//   for (let i = 0; i < 10; i++) {
//     const p = new Podcast(i.toString(), `TITLE ${i}`, `AUTHOR ${i}`, `DESCRIPTION ${i}`, [`CATEGORY ${i}`])
//     podcasts.unshift(p);
//   }

//   const result = await queue.pushPodcastUpdate(podcasts[0]);

//   const sqs = new SQS({ endpoint: process.env.SQS_ENDPOINT, region: process.env.SQS_REGION });
//   const receivedMessagesPromiseOne: Promise<any>[] = podcasts.map(_p => sqs.receiveMessage({
//     QueueUrl: process.env.PODCAST_UPDATE_QUEUE_URL,
//   }).promise());
//   const receivedMessagesOne: any[] = await Promise.all(receivedMessagesPromiseOne);
//   console.log(JSON.stringify(receivedMessagesOne));
// }

// (async () => {
//   await run();
// })();
