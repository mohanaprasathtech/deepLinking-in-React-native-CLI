module.exports = {
  preset: '@react-native/jest-preset',
  // react-native-webview ships untranspiled ES modules, so Jest has to run it
  // through Babel instead of skipping it like the rest of node_modules.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-webview|react-native-safe-area-context)/)',
  ],
};
