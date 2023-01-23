const tasks = require("jfrog-pipelines-tasks");
const semver = require("semver");
const path = require("path");
const fs = require("fs");
const os = require("os");
const downloader = require("./downloader");
const info = require("./info");

function run() {
  downloader.download("", "", "").then(r => r.toString())
  info.writeInfo()
}

module.exports = {
  run,
};