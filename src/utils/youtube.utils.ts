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
 * The origin our little embed page is served from.
 *
 * It must be an https origin that is NOT youtube.com. Setting this to
 * 'https://www.youtube.com' makes the page claim to be YouTube itself, and
 * YouTube rejects that with "This video is unavailable - Error code: 152-4"
 * for every video, even ones that allow embedding. Verified on an API 35
 * device: youtube.com -> 152, localhost -> plays.
 */
export const YOUTUBE_BASE_URL = 'https://localhost';

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
    // Tells YouTube which page is embedding it. Must match the WebView's
    // baseUrl below, or the player refuses to start.
    `origin=${encodeURIComponent(YOUTUBE_BASE_URL)}`,
  ].join('&');

  return `https://www.youtube.com/embed/${videoId}?${params}`;
}

/**
 * Wraps the embed URL in a tiny HTML page containing an <iframe>.
 *
 * Why not just point the WebView straight at the embed URL?
 *
 * Loading `youtube.com/embed/...` as the page itself sends no `Referer`
 * header and has no real web origin. YouTube rejects that with
 * "Video player configuration error - Error 153". (Chrome does the same
 * thing with that URL, so it is not a React Native problem.)
 *
 * Serving our own page instead gives the iframe a real parent origin, which
 * is what YouTube wants. That origin must not be youtube.com itself - see
 * YOUTUBE_BASE_URL above.
 */
export function buildYouTubeEmbedHtml(videoId: string): string {
  const embedUrl = buildYouTubeEmbedUrl(videoId);

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style>
      html, body { margin: 0; padding: 0; height: 100%; background: #000; overflow: hidden; }
      iframe { display: block; border: 0; width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <iframe
      src="${embedUrl}"
      frameborder="0"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
  </body>
</html>`;
}
