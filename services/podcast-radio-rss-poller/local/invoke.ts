require('custom-env').env('local');

import fs from 'fs/promises';
import { handler } from '../src/index';

(async () => {
  const event: string = await fs.readFile(process.argv[2], { encoding: 'utf-8' });
  await handler(JSON.parse(event));
})();