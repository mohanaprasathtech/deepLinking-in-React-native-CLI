/**
 * Jest has no real device attached, so the WebView native module does not
 * exist. Swap it for a plain View to keep render tests working.
 */
jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return { __esModule: true, WebView: View, default: View };
});
