const path = require("path");
const fs = require("fs");
const packageJson = require("./package.json");

const devMode = process.argv.length !== 3 || process.argv[2] !== "--prod";

const distDirName = devMode ? "build" : "dist";
const distDir = path.join(__dirname, distDirName);
if(fs.existsSync(distDir)){
  fs.rmdirSync(distDir, {recursive: true});
}
fs.mkdirSync(distDir);

if(devMode){
  return;
}

const copyFileToPublish = (fileName) => {
  const srcPath = path.join(__dirname, fileName);
  const distPath = path.join(distDir, fileName);
  if(fs.existsSync(srcPath)){
    fs.copyFileSync(srcPath, distPath);
  }
};

copyFileToPublish("README.md");
copyFileToPublish("LICENSE");

if(typeof packageJson.devDependencies !== "undefined") delete packageJson.devDependencies;
if(typeof packageJson.scripts !== "undefined") delete packageJson.scripts;

fs.writeFileSync(path.join(distDir, "package.json"), JSON.stringify(packageJson, null, 2));
