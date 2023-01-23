const tasks = require("jfrog-pipelines-tasks");
const semver = require("semver");
const path = require("path");
const fs = require("fs");
const os = require("os");
const downloader = require("./downloader");

function run() {
  let downloadStr = downloader.download("", "", "").then(r => r.toString())
}

module.exports = {
  run,
};