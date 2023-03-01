// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
// Create the default Metro config
const config = getDefaultConfig(projectRoot);

config.resolver.extraNodeModules = {
	"jotai-signal": path.resolve(projectRoot, "node_modules/jotai-signal/src"),
};

module.exports = config;
