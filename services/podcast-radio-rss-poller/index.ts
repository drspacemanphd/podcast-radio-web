require('custom-env').env(process.env.NODE_ENV);

import { handler as lambda } from './src';

export async function handler(event: any, context: any, callback: any): Promise<any> {
  return await lambda(event);
}