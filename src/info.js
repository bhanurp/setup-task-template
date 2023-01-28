const tasks = require("jfrog-pipelines-tasks");
const {error} = require("jfrog-pipelines-tasks");

async function writeInfo() {
  const{stdout, stderr} = await tasks.execute('yarn --version')
  if (stderr){
    tasks.error(stderr)
    throw error("Failed to fetch yarn version.")
  }
  tasks.info("Installed yarn version is:"+stdout)
}

module.exports = {
  writeInfo,
};