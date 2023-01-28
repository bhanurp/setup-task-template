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
  if (stdErr) {
    tasks.error(stdErr)
    await Promise.reject('failed to fetch node version')
  }
  tasks.info("Received node version is:" + stdOut.toString())

  let isNewNodeVersion = semver.gte(stdOut.toString(), '16.10.0')
  tasks.info("node version:"+isNewNodeVersion)
  if (isNewNodeVersion) {
    await tasks.execute("corepack enable")
  }
  await tasks.execute("npm i -g corepack")
}

module.exports = {
  download,
};