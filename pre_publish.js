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
