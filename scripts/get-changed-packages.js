const { spawnSync } = require('child_process');

const allPackages = spawnSync('lerna', ['ls']).stdout.toString('utf-8').split(/\n/);

console.log('ALL PACKAGES')
console.log(allPackages);
console.log('')

const diffedFiles = spawnSync('git', ['diff', 'master', '--name-only']);
if (diffedFiles.error) {
  throw new Error(diffedFiles.error.stack);
}

console.log('DIFFED FILES')
console.log(diffedFiles.stdout.toString('utf-8'));
console.log('')

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

if (packageSet.includes('infrastructure')) {
  process.stdout.write(`${allPackages.join(';')}`);
} else if (packageSet.length) {
  process.stdout.write(`${packageSet.join(';')}`);
}