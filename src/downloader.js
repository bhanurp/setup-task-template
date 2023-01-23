const tasks = require("jfrog-pipelines-tasks");
const semver = require("semver");

async function download(targetFolder, cacheIntegration, cacheRepository) {

  const url = computeDownloadUrl();
  tasks.info(`package url: ${url}`);
  if (!cacheIntegration || !cacheRepository) {
    tasks.warning("Cache configuration not set. Caching will be skipped.");
  }
  await tasks.execute(url)
}

function computeDownloadUrl() {
  let nodeVersion = tasks.execute(`node --version`).then(r => r.stdOut.toString())
  tasks.info("received node version is "+ nodeVersion)

  let isNewNodeVersion = semver.gte(nodeVersion, '16.10.0')
  if (isNewNodeVersion) {
    return 'corepack enable'
  }
  return 'npm i -g corepack'
}

module.exports = {
  download,
};