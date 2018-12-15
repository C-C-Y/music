const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  baseUrl: "./",
  assetsDir: "assets",
  chainWebpack: config => {
    config.resolve.alias.set("asset", resolve("src/assets"));
    config.resolve.alias.set("style", resolve("src/assets/styles"));
    config.resolve.alias.set("common", resolve("src/common"));
  }
};
