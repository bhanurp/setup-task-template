const tasks = require("jfrog-pipelines-tasks");
const semver = require("semver");
const resolve = require("resolve");
const {error} = require("jfrog-pipelines-tasks");

async function download(targetFolder, cacheIntegration, cacheRepository) {

  const url = await computeDownloadUrl().then((message) => {
    return message
  }).catch((message) => {
    tasks.error("failed to resolve download url")
    return error(message)
  })
  if (!cacheIntegration || !cacheRepository) {
    tasks.warning("Cache configuration not set. Caching will be skipped.");
  }
}

async function computeDownloadUrl() {
  const {stdOut, stdErr} = await tasks.execute("node --version")
  const goPath = (await tasks.execute("node --version")).stdOut;
  tasks.info("received node version:"+ goPath)
  if (stdErr) {
    tasks.error(stdErr)
    return Promise.reject('failed to fetch node version')
  }
  tasks.info("received node version is " + stdOut.toString())

  let isNewNodeVersion = semver.gte(nodeVersion, '16.10.0')
  if (isNewNodeVersion) {
    await tasks.execute("corepack enable")
    return Promise.resolve('success')
  }
  await tasks.execute("npm i -g corepack")
  return Promise.resolve('success')
}

module.exports = {
  download,
};