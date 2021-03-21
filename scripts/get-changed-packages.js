const { spawnSync } = require('child_process');

const allPackages = spawnSync('lerna', ['ls']).stdout.toString('utf-8').split(/\n/);

const diffedFiles = spawnSync('git', ['diff', '--name-only', 'master']);
if (diffedFiles.error) {
  throw new Error(diffedFiles.error.stack);
}

diffedFiles.stdout.toString('utf-8')

const diffedPackages = diffedFiles.stdout.toString('utf-8')
  .split(/\n/)
  .map(file => {
    if (file.startsWith('packages')) {
      const match = file.match(/\/([a-zA-Z-]+)\//);
      return `@drspacemanphd/${match[1]}`;
    } else if (file.includes('/')) {
      const match = file.match(/[a-zA-Z-]+/);
      return match.toString();
    } else {
      return file;
    }
  })
  .filter(file => {
    return file.startsWith('infrastructure') || file.startsWith('@drspacemanphd');
  });

const packageSet = Array.from(new Set(diffedPackages));
process.stdout.write(`${allPackages.join(';')}`);
// if (packageSet.includes('infrastructure')) {
//   process.stdout.write(`${allPackages.join(';')}`);
// } else {
//   process.stdout.write(`${packageSet.join(';')}`);
// }