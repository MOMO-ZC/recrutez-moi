const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Transformer settings
  config.transformer = {
    ...config.transformer, // Ensure existing settings are not overwritten
    assetPlugins: ['expo-asset/tools/hashAssetFiles'], // Hash assets like images
    babelTransformerPath: require.resolve('react-native-svg-transformer'), // Support SVG files
  };

  // Resolver settings
  config.resolver = {
    ...config.resolver, // Ensure existing settings are preserved
    assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'), // Exclude SVG from assets
    sourceExts: [...config.resolver.sourceExts, 'svg'], // Include SVG in source files
  };

  return config;
})();
