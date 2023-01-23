const tasks = require("jfrog-pipelines-tasks");

function writeInfo() {
  tasks.execute('yarn --version').then(r => r.stdOut)
  tasks.execute('which yarn').then(r => r.stdOut)
}

module.exports = {
  writeInfo,
};