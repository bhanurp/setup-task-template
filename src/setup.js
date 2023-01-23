const tasks = require("jfrog-pipelines-tasks");
const semver = require("semver");
const path = require("path");
const fs = require("fs");
const os = require("os");
const downloader = require("./downloader");

let inputVersion;
let inputCacheIntegration;
let inputCacheRepository;

function readAndValidateInput() {
  inputVersion = tasks.getInput("version");
  if (!inputVersion) throw "version input is required";

  inputVersion = semver.valid(inputVersion);
  if (!inputVersion) throw "version input must be semver compatible";

  inputCacheIntegration = tasks.getInput("cacheIntegration");
  inputCacheRepository = tasks.getInput("cacheRepository");
}

function findArtifactoryIntegration(inputCacheIntegration) {
  if (inputCacheIntegration) {
    const currentIntegration = tasks.getIntegration(inputCacheIntegration);
    if (currentIntegration.masterName.toLowerCase() === "artifactory") {
      return currentIntegration;
    } else {
      throw (
        "Input cacheIntegration is not an Artifactory Integration. Type: " +
        currentIntegration.masterName
      );
    }
  } else {
    tasks.info("Searching for Artifactory integration");
    try {
      const currentIntegration = tasks.findIntegrationByType("artifactory");
      tasks.info(`Artifactory integration ${currentIntegration.name} founded!`);
      return currentIntegration;
    } catch (err) {
      if (err instanceof tasks.IntegrationNotFound) {
        return undefined;
      } else {
        throw err;
      }
    }
  }
}

function createTargetFolder() {
  const goFolder = path.join(tasks.getStepWorkspaceDir(), "go");
  fs.mkdirSync(goFolder, { recursive: true });
  return goFolder;
}

function run() {
  let downloadStr = downloader.download(", "", "").then(r => r.toString())
}

module.exports = {
  run,
};