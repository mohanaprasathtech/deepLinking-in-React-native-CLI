/**
 * Helpers to turn any YouTube URL into something a WebView can embed.
 */

/**
 * Pulls the 11-character video id out of the common YouTube URL shapes:
 *
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/shorts/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID
 *   https://www.youtube.com/live/VIDEO_ID
 *
 * Returns `null` when the URL is not a YouTube link we recognise.
 */
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /\/(?:shorts|embed|live|v)\/([A-Za-z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Builds the embed URL used by the floating player.
 *
 * `playsinline=1` is the important one: without it iOS takes the video
 * fullscreen instead of keeping it inside our little window.
 */
export function buildYouTubeEmbedUrl(videoId: string): string {
  // Built by hand on purpose: React Native's URLSearchParams polyfill does
  // not fully support `toString()`.
  const params = [
    'autoplay=1',
    'playsinline=1',
    'rel=0',
    'modestbranding=1',
    'controls=1',
    'fs=0',
  ].join('&');

  return `https://www.youtube.com/embed/${videoId}?${params}`;
}
