const tasks = require("jfrog-pipelines-tasks");
const semver = require("semver");
const resolve = require("resolve");
const {error} = require("jfrog-pipelines-tasks");

async function download(targetFolder, cacheIntegration, cacheRepository) {

  const url = computeDownloadUrl().then((message) => {
    return message
  }).catch((message) => {
    tasks.error("failed to resolve download url")
    return error(message)
  })
  if (!cacheIntegration || !cacheRepository) {
    tasks.warning("Cache configuration not set. Caching will be skipped.");
  }
  tasks.info("completed installation of yarn")
}

async function computeDownloadUrl() {
  //let nodeVersion = tasks.execute(`node --version`).then(r => r.stdOut.toString())
  const {stdOut, stdErr} = tasks.execute("node --version")
  if (stdErr) {
    tasks.error(stdErr)
    return
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