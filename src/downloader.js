const tasks = require("jfrog-pipelines-tasks");

async function download(targetFolder, cacheIntegration, cacheRepository) {
  const url = await computeDownloadUrl()
  if (!cacheIntegration || !cacheRepository) {
    tasks.warning("Cache configuration not set. Caching will be skipped.");
  }
  return url
}

async function computeDownloadUrl() {
  try {
    const commandOutput = await tasks.execute("node --version")
    handleCommandOutput(commandOutput)
    tasks.info("Received node version is:" + stdOut.toString())
    const installCommandOutput = await tasks.execute("npm install --global yarn")
    handleCommandOutput(installCommandOutput)
  } catch (e) {
    throw new Error(e);
  }
}


/**
 * Handles command execution output stdOut and stdErr
 * @param commandOutput
 */
function handleCommandOutput(commandOutput) {
  if (commandOutput.stdErr){
    tasks.error(commandOutput.stdErr)
  } else {
    tasks.info(commandOutput.stdOut);
  }
}

module.exports = {
  download,
};