import _ from 'lodash';
import { URL } from 'url';
import moment from 'moment';
import { Podcast, Episode } from '@drspacemanphd/podcast-radio-model';
import { ScrapeFunction } from '../';
import { getFeed } from '../utils/get-feed';
import { PodcastProps, EpisodeProps } from '../utils/prop-maps';

export const scraper: Record<string, ScrapeFunction> = {
  'rss.art19.com': scrape
};

async function scrape(url: URL): Promise<{ podcast: Podcast, episodes: Episode[] }> {
  const podcastProps: Record<string, any> = {};
  const episodePropsArr:  Record<string, any>[] = [];

  const processedFeed: Record<string, any> = await getFeed(url);
  const rss: Record<string, any> = processedFeed.elements.filter((e: any) => e.name === 'rss')[0];
  const channel: Record<string, any> = rss.elements.filter((e: any) => e.name === 'channel')[0];

  channel.elements.forEach((el: Record<string, any>) => {
    if (podcastPropMap[el.name]) {
      const podcastProp: string = podcastPropMap[el.name];

      if (el.name.toLowerCase() === 'itunes:category') {
        podcastProps[podcastProp] = _.get(el, podcastAttributeMap[el.name]) ? [_.get(el, podcastAttributeMap[el.name])] : undefined;
      } else {
        podcastProps[podcastProp] = _.get(el, podcastAttributeMap[el.name]);
      }
    }

    if (el.name === 'item') {
      const episodeProps: Record<string, any> = {};
      el.elements.forEach((elel: any) => {
        if (episodePropMap[elel.name]) {
          const episodeProp: string = episodePropMap[elel.name];
          const prop = _.get(elel, episodeAttributeMap[elel.name]);
          const processedProp = prop ? prop.replace(/\n+/g, ' ') : undefined;
          episodeProps[episodeProp] = processedProp;
        }
      });
      episodePropsArr.push(episodeProps);
    }
  });

  const podcast: Podcast = _mapPodcast(podcastProps);
  const episodes: Episode[] = episodePropsArr.map((e: EpisodeProps) => _mapEpisode(e, podcast));

  return { podcast, episodes };
}

const podcastPropMap: Record<string, string> = {
  'title': 'title',
  'itunes:author': 'author',
  'itunes:summary': 'description',
  'itunes:category': 'categories',
  'itunes.image': 'imageUrl',
}

const podcastAttributeMap: Record<string, string> = {
  'title': 'elements[0].text',
  'itunes:author': 'elements[0].text',
  'itunes:summary': 'elements[0].text',
  'itunes:category': 'elements[0].attributes.text',
  'itunes.image': 'elements[0].attributes.href',
}

const episodePropMap: Record<string, string> = {
  'title': 'title',
  'itunes:author': 'author',
  'itunes:summary': 'description',
  'enclosure': 'audioUrl',
  'itunes:duration': 'duration',
  'pubDate': 'publicationDate',
}

const episodeAttributeMap: Record<string, string> = {
  'title': 'elements[0].text',
  'itunes:author': 'elements[0].text',
  'itunes:summary': 'elements[0].text',
  'enclosure': 'attributes.url',
  'itunes:duration': 'elements[0].text',
  'pubDate': 'elements[0].text'
}

function _mapPodcast(props: PodcastProps): Podcast {
  return new Podcast('guid', props.title, props.author, props.description, props.categories, props.imageUrl);
}

function _mapEpisode(props: EpisodeProps, podcast: Podcast): Episode {
  const mom = moment(props.duration, 'HH:mm:ss');
  return new Episode('guid', props.title, props.author, podcast.guid, podcast.title, props.description,
    props.audioUrl, (mom.hours() * 60 * 60) + (mom.minutes() * 60) + mom.seconds(), new Date(props.publicationDate), 0);
}

