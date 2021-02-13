const fs = require('fs');

function getTime() {
  const data = fs.readFileSync(process.stdin.fd, 'utf-8');
  const parsed = JSON.parse(data);
  const time = (Math.trunc((parseFloat(parsed.minsToAdd) * 60) + (new Date().getTime() / 1000))).toString();
  process.stdout.write(JSON.stringify({ time }));
  return;
}

getTime();
