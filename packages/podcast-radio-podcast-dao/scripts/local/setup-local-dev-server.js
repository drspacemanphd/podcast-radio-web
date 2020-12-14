require('custom-env').env('local');

const express = require('express');
const { PodcastDao, EpisodeDao } = require('../../dist/index');

const app = express();
app.use(express.json());

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