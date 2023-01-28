const tasks = require("jfrog-pipelines-tasks");
const {error} = require("jfrog-pipelines-tasks");

async function writeInfo() {
  const {stdOut, stdErr} = await tasks.execute("node --version")
  if (stdErr){
    tasks.error(stdErr.toString())
    throw error("Failed to fetch yarn version.")
  }
  tasks.info("Installed yarn version is:"+stdOut.toString())
}

module.exports = {
  writeInfo,
};