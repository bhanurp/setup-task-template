const tasks = require("jfrog-pipelines-tasks");
const semver = require("semver");

async function download(targetFolder, cacheIntegration, cacheRepository) {

  const url = computeDownloadUrl();
  tasks.info(`package url: ${url}`);
  if (!cacheIntegration || !cacheRepository) {
    tasks.warning("Cache configuration not set. Caching will be skipped.");
  }
  // const pathToFile = await tasks.downloadFile(goUrl, targetFolder, cacheRepository, cacheIntegration);
  // await extractPackage(pathToFile, targetFolder);
  await tasks.execute(url)
}

function computeDownloadUrl() {
  let nodeVersion = tasks.execute(`node --version`).then(r => r.stdOut)

  let isNewNodeVersion = semver.gte(nodeVersion, '16.10.0')
  if (isNewNodeVersion) {
    return 'corepack enable'
  }
  return 'npm i -g corepack'
}

function getOsFamily() {
  return tasks.getOperatingSystemFamily().toLowerCase();
}

function getArchitecture() {
  const arch = tasks.getArchitecture();
  if (arch === "x86_64") return "amd64";
  if (arch === "ARM64") return "arm64";
  throw new tasks.PipelinesTaskError("Architecture not supported");
}

function getPackageType(osFamily) {
  if (osFamily === "windows") return "zip";
  return "tar.gz";
}

async function extractPackage(pathToPackage, targetFolder) {
  tasks.info("Extracting package content");
  const osFamily = getOsFamily();
  const packageType = getPackageType(osFamily);
  if (packageType === "zip")
    await tasks.unzip(pathToPackage, targetFolder);
  else
    await tasks.untar(pathToPackage, targetFolder);
}

module.exports = {
  download,
};