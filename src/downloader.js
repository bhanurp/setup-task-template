const tasks = require("jfrog-pipelines-tasks");
const utils = require("utils.js")

/**
 * downloads the required package installer
 * @param targetFolder
 * @param cacheIntegration
 * @param cacheRepository
 * @returns {Promise<string>}
 */
async function download(targetFolder, cacheIntegration, cacheRepository) {
  const url = await computeDownloadUrl()
  if (!cacheIntegration || !cacheRepository) {
    tasks.warning("Cache configuration not set. Caching will be skipped.");
  }
  return url
}

/**
 * Return the url used to download the package installer
 * @returns {Promise<string>}
 */
async function computeDownloadUrl() {
  try {
    const commandOutput = await tasks.execute("node --version")
    utils.handleCommandOutput(commandOutput)
    return 'npm install -g yarn'
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  download,
};