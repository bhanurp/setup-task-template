const tasks = require("jfrog-pipelines-tasks");
const {error} = require("jfrog-pipelines-tasks");

async function writeInfo() {
  const{stdout, stderr} = await tasks.execute('yarn --version')
  if (stderr){
    tasks.error(stderr.toString())
    throw error("Failed to fetch yarn version.")
  }
  tasks.info("Installed yarn version is:"+stdout.toString())
}

module.exports = {
  writeInfo,
};