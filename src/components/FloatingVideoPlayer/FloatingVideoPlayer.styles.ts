import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../../theme/colors';

/** Size of the mini player. 16:9 video + a small header bar on top. */
export const PLAYER_WIDTH = 260;
export const HEADER_HEIGHT = 34;
export const VIDEO_HEIGHT = Math.round((PLAYER_WIDTH * 9) / 16);
export const PLAYER_HEIGHT = VIDEO_HEIGHT + HEADER_HEIGHT;
/** Minimum gap kept between the player and the screen edges. */
export const EDGE_MARGIN = 12;

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    borderRadius: radius.sm,
    overflow: 'hidden',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    // Shadow so it clearly floats above the screen content.
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 11,
    marginLeft: spacing.sm,
  },
  headerAction: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  headerActionText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  dragHandle: {
    width: 14,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.textSecondary,
  },
  videoArea: {
    width: PLAYER_WIDTH,
    height: VIDEO_HEIGHT,
    backgroundColor: '#000000',
  },
  webView: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
});
