const tasks = require("jfrog-pipelines-tasks");
const semver = require("semver");
const path = require("path");
const fs = require("fs");
const os = require("os");
const downloader = require("./downloader");
const info = require("./info");

function run() {
  downloader.download("", "", "")
    .then((message) => {
      tasks.info("received message:"+message)
      tasks.info("completed downloading and installation of yarn")
    }).catch(() => {
      tasks.error("failed to install yarn")
  })
  info.writeInfo()
}

module.exports = {
  run,
};