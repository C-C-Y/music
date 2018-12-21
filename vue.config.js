module.exports = {
  baseUrl: "./",
  assetsDir: "assets",
  configureWebpack: {
    resolve: {
      alias: {
        asset: "@/assets",
        style: "@/assets/styles",
        common: "@/common",
        base: "@/base",
        comp: "@/components"
      }
    }
  }
};
