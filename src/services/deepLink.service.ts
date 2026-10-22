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
 *
 * Note: we deliberately do NOT call `Linking.canOpenURL()` first.
 *
 * For an http/https link there is always a handler (at minimum a browser), so
 * the check adds no safety — but it can wrongly return `false` on Android 11+
 * whenever the running build's AndroidManifest is missing the <queries>
 * block, which made every shopping button report "no app can open this link".
 * Calling `openURL` directly and catching the failure gives the same
 * protection without that false-negative.
 *
 * `canOpenURL` is still the right tool for custom schemes such as
 * `flipkart://` or `whatsapp://`, where the app genuinely may not exist.
 */
export async function openExternalLink(url: string): Promise<OpenLinkResult> {
  try {
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
