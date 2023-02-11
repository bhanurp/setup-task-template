const tasks = require("jfrog-pipelines-tasks");
const downloader = require("./downloader");
const info = require("./info");
const utils = require("./utils");

async function run() {
  try {
    const message = await downloader.download("", "", "")
    tasks.info("Command to install yarn:" + message)
    installPackage(message)
    await info.writeInfo()
  } catch (err) {
    tasks.error(err)
    return err
  }
}

/**
 * Takes the command to run to install package
 * @param command
 * @returns {Promise<void>}
 */
async function installPackage(command) {
  try {
    const installCommandOutput = await tasks.execute("npm install --global yarn")
    utils.handleCommandOutput(installCommandOutput)
  } catch (e) {
    tasks.error(err)
    throw new Error(e)
  }
}

module.exports = {
  run,
};