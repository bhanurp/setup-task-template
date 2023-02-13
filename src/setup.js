const tasks = require("jfrog-pipelines-tasks");
const utils = require("./utils");
const semver = require("semver");

async function run() {
  try {
    const inputVersion = readAndValidateInput()
    await validateNodeInstallation()
    await installPackage(inputVersion)
    await utils.writeInfo()
  } catch (err) {
    tasks.error(err)
    return err
  }
}

/**
 * read tasks input and validate
 * @returns {string}
 */
function readAndValidateInput() {
  let inputVersion = tasks.getInput('version');
  if (!inputVersion || inputVersion === '' || inputVersion === 'null') {
    inputVersion = 'latest'
  } else {
    inputVersion = semver.valid(inputVersion);
    if (!inputVersion) {
      throw new Error("version input must be semver compatible");
    }
  }
  return inputVersion
}

/**
 * Return the url used to download the package installer
 * @returns {Promise<string>}
 */
async function validateNodeInstallation() {
  try {
    const commandOutput = await tasks.execute("node --version")
    utils.handleCommandOutput(commandOutput)
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Takes the command to run to install package
 * @returns {Promise<void>}
 */
async function installPackage(inputVersion) {
  try {
    const installCommandOutput = await tasks.execute(`npm install --global yarn@${inputVersion}`)
    utils.handleCommandOutput(installCommandOutput)
  } catch (e) {
    tasks.error(e)
    throw new Error('failed to install yarn')
  }
}

module.exports = {
  run,
  installPackage,
  readAndValidateInput,
  validateNodeInstallation,
};

if (require.main === module) {
  run();
}