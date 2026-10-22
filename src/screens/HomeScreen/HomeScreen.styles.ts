import { StyleSheet } from 'react-native';

import { colors, spacing } from '../../theme/colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  // Centres the three buttons vertically and horizontally.
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 420,
  },
});
