import { Linking } from 'react-native';

import type { OpenLinkResult } from '../types/link.types';

/**
 * Hands a URL to the operating system.
 *
 * For `https://amzn.in/...` and `https://dl.flipkart.com/...` the OS looks at
 * which installed app has claimed that domain (Android App Links / iOS
 * Universal Links). If Amazon or Flipkart is installed, their app opens.
 * If not, the default browser opens the link instead — and the browser then
 * redirects into the app if it can. Either way we never render these pages
 * ourselves.
 */
export async function openExternalLink(url: string): Promise<OpenLinkResult> {
  try {
    // On Android 11+ this returns false unless the app declares a matching
    // <queries> entry in AndroidManifest.xml. See the manifest for details.
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      return {
        success: false,
        message: 'No app on this device can open this link.',
      };
    }

    await Linking.openURL(url);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Could not open the link.',
    };
  }
}
