const tasks = require("jfrog-pipelines-tasks");
const semver = require("semver");
const path = require("path");
const fs = require("fs");
const os = require("os");
const downloader = require("./downloader");
const info = require("./info");

async function run() {
  try {
    const message = await downloader.download("", "", "")
    tasks.info("Received message:" + message)
    await info.writeInfo()
  } catch (err) {
    tasks.error(err)
    return err
  }
}

module.exports = {
  run,
};