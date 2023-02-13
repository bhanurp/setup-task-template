const tasks = require("jfrog-pipelines-tasks");

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

/**
 * write node and yarn installed versions
 * @returns {Promise<void>}
 */
async function writeInfo() {
  const nodeCommandOutput = await tasks.execute("node --version")
  handleCommandOutput(nodeCommandOutput)
  const yarnCommandOutput = await tasks.execute("yarn --version")
  handleCommandOutput(yarnCommandOutput)
}

module.exports = {
  handleCommandOutput,
  writeInfo,
};