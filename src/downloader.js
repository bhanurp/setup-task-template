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

async function computeDownloadUrl() {
  //let nodeVersion = tasks.execute(`node --version`).then(r => r.stdOut.toString())
  const {stdOut, stdErr} = (await tasks.execute("node --version"))
  if (stdErr) {
    tasks.error(stdErr)
    return
  }
  tasks.info("received node version is " + stdOut.toString())

  let isNewNodeVersion = semver.gte(nodeVersion, '16.10.0')
  if (isNewNodeVersion) {
    return 'corepack enable'
  }
  return 'npm i -g corepack'
}

module.exports = {
  download,
};