import { StyleSheet } from 'react-native';

import { radius, spacing } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  url: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 11,
    textAlign: 'center',
    marginTop: spacing.sm,
    textDecorationLine: 'underline',
  },
});
