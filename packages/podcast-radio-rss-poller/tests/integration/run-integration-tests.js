const { spawnSync } = require('child_process');

let testsFinished = false;
const errorStdOut = [];

function startTests() {
  composeUp();

  const poller = getPoller();
  const watcher = getWatcher(poller);

  return { poller, watcher };
}

function composeUp() {
  composeDown();
  const dockerComposeUp = spawnSync('docker-compose', ['-f', 'docker-compose.integration.yml', 'up', '-d', '--build']);

  if (dockerComposeUp.status !== 0) {
    console.error(`docker-compose up returned error: ${dockerComposeUp.status}, ${dockerComposeUp.stderr.toString()}`);
    errorStdOut.push(dockerComposeUp.stderr.toString());
    throw new Error(dockerComposeUp.error);
  }

  return dockerComposeUp.status;
}

function getPoller() {
  return setTimeout(() => {
    if (!testsFinished) {
      poll();
      return setTimeout(getPoller, 5000);
    }
  }, 5000);
}

function poll() {
  const poll = spawnSync('docker', ['ps', '-a']);

  if (poll.status !== 0) {
    console.err(`polling returned error: ${poll.status}, ${poll.error}`);
    errorStdOut.push(poll.stderr.toString());
    throw new Error(poll.error);
  }

  const line = poll.stdout.toString().split('\n').filter(s => s.includes('integration-tests'))[0];
  if (line) {
    const logs = spawnSync('docker', ['logs', 'integration-tests']);
    console.log(logs.stdout.toString());
  }

  if (line.includes('Exited (0)')) {
    testsFinished = true
    testsExitCode = 0;
    console.log(spawnSync('docker', ['logs', 'integration-tests']).stderr.toString());
  } else if (line.includes('Exited')) {
    testsFinished = true
    testsExitCode = 1;
    console.log(spawnSync('docker', ['logs', 'integration-tests']).stderr.toString());
  }
}

function getWatcher(pollerId) {
  return setTimeout(() => {
    if (testsFinished) {
      clearTimeout(pollerId);
      composeDown();
      console.log(`EXITING WITH CODE: ${testsExitCode}`);
      process.exit(testsExitCode);
    } else {
      return setTimeout(getWatcher, 500);
    }
  }, 500);
}

function composeDown() {
  const dockerComposeDown = spawnSync('docker-compose', ['-f', 'docker-compose.integration.yml', 'down']);

  if (dockerComposeDown.status !== 0) {
    console.error(`docker-compose down returned error: ${dockerComposeDown.status}, ${dockerComposeDown.error}`);
    errorStdOut.push(dockerComposeDown.stderr.toString());
    throw new Error(dockerComposeDown.error);
  }

  spawnSync('docker', ['network', 'rm', 'podcast-radio-rss-poller_default']);

  return dockerComposeDown.status;
}

startTests();
