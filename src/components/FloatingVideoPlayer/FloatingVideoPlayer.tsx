import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  PanResponder,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { openExternalLink } from '../../services/deepLink.service';
import { colors } from '../../theme/colors';
import {
  buildYouTubeEmbedHtml,
  extractYouTubeVideoId,
  YOUTUBE_BASE_URL,
} from '../../utils/youtube.utils';
import {
  EDGE_MARGIN,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  styles,
} from './FloatingVideoPlayer.styles';

interface FloatingVideoPlayerProps {
  /** Any YouTube watch / youtu.be / shorts URL. */
  videoUrl: string;
  /** Called when the user taps the × on the mini player. */
  onClose: () => void;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * WhatsApp-style picture-in-picture preview.
 *
 * It is a small floating card pinned on top of the screen that plays the
 * YouTube video inside a WebView. The user can drag it anywhere, keep
 * scrolling/tapping the screen behind it, or close it.
 */
const FloatingVideoPlayer: React.FC<FloatingVideoPlayerProps> = ({
  videoUrl,
  onClose,
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);

  const videoId = useMemo(() => extractYouTubeVideoId(videoUrl), [videoUrl]);
  const embedHtml = useMemo(
    () => (videoId ? buildYouTubeEmbedHtml(videoId) : null),
    [videoId],
  );

  // Starting spot: bottom-right corner, a little above the bottom edge.
  const startPosition = useMemo(
    () => ({
      x: screenWidth - PLAYER_WIDTH - EDGE_MARGIN,
      y: screenHeight - PLAYER_HEIGHT - EDGE_MARGIN * 6,
    }),
    [screenWidth, screenHeight],
  );

  // `pan` drives the on-screen transform; `positionRef` remembers where the
  // card was left so the next drag starts from there.
  const pan = useRef(new Animated.ValueXY(startPosition)).current;
  const positionRef = useRef(startPosition);

  // Kept in a ref so the PanResponder (created once) always reads fresh bounds
  // after a rotation instead of the values captured on first render.
  const boundsRef = useRef({ screenWidth, screenHeight });
  boundsRef.current = { screenWidth, screenHeight };

  const panResponder = useRef(
    PanResponder.create({
      // Only start dragging after a clear finger movement, so simple taps
      // still reach the video controls inside the WebView.
      //
      // `...Capture` is important: the WebView would otherwise keep every
      // touch for itself and the card could not be dragged over the video.
      onMoveShouldSetPanResponderCapture: (_event, gesture) =>
        Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4,
      // Once we are dragging, nothing else may steal the gesture.
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        pan.setOffset(positionRef.current);
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: (_event, gesture) => {
        pan.flattenOffset();

        const { screenWidth: w, screenHeight: h } = boundsRef.current;
        const next = {
          x: clamp(
            positionRef.current.x + gesture.dx,
            EDGE_MARGIN,
            w - PLAYER_WIDTH - EDGE_MARGIN,
          ),
          y: clamp(
            positionRef.current.y + gesture.dy,
            EDGE_MARGIN,
            h - PLAYER_HEIGHT - EDGE_MARGIN,
          ),
        };

        positionRef.current = next;
        Animated.spring(pan, {
          toValue: next,
          useNativeDriver: false,
          friction: 7,
        }).start();
      },
    }),
  ).current;

  const handleOpenInYouTube = useCallback(() => {
    openExternalLink(videoUrl);
  }, [videoUrl]);

  return (
    <Animated.View
      style={[styles.container, pan.getLayout()]}
      {...panResponder.panHandlers}>
      <View style={styles.header}>
        <View style={styles.dragHandle} />
        <Text style={styles.headerTitle} numberOfLines={1}>
          Drag me • tap ↗ for the app
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open in the YouTube app"
          hitSlop={6}
          onPress={handleOpenInYouTube}
          style={styles.headerAction}>
          <Text style={styles.headerActionText}>↗</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close the video preview"
          hitSlop={6}
          onPress={onClose}
          style={styles.headerAction}>
          <Text style={styles.headerActionText}>✕</Text>
        </Pressable>
      </View>

      <View style={styles.videoArea}>
        {embedHtml ? (
          <>
            <WebView
              // Our own page + a non-youtube.com baseUrl, not the embed URL
              // directly. That combination is what avoids YouTube's error
              // 153 and 152. See youtube.utils.ts for the full explanation.
              source={{ html: embedHtml, baseUrl: YOUTUBE_BASE_URL }}
              style={styles.webView}
              originWhitelist={['*']}
              javaScriptEnabled
              domStorageEnabled
              // Keeps the video inside this little box on iOS instead of
              // taking over the whole screen.
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
              allowsFullscreenVideo={false}
              scrollEnabled={false}
              bounces={false}
              onLoadEnd={() => setIsLoading(false)}
            />
            {isLoading && (
              <View style={styles.loader} pointerEvents="none">
                <ActivityIndicator color={colors.youtube} />
              </View>
            )}
          </>
        ) : (
          <View style={styles.loader}>
            <Text style={styles.errorText}>
              That does not look like a YouTube video link.
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default FloatingVideoPlayer;
