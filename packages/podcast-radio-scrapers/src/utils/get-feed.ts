import got from 'got';
import { URL } from 'url';
import xmljs from 'xml-js';

export async function getFeed(url: URL): Promise<Record<string, any>> {
  const xmlResponse = await got(url, { timeout: 4000, retry: 3 }).text();
  const json = await parseXml(xmlResponse);
  return await parseJsonString(json);
}

async function parseXml(xml: string): Promise<string> {
  return new Promise((resolve, _reject) => {
    resolve(xmljs.xml2json(xml));
  });
}

async function parseJsonString(json: string): Promise<Record<string,any>> {
  return new Promise((resolve, _reject) => {
    resolve(JSON.parse(json));
  });
}