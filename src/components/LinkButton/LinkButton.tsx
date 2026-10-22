import React, { memo, useCallback } from 'react';
import { Pressable, Text } from 'react-native';

import type { LinkItem } from '../../types/link.types';
import { styles } from './LinkButton.styles';

interface LinkButtonProps {
  link: LinkItem;
  onPress: (link: LinkItem) => void;
}

/**
 * One brand-coloured button showing the label, a one-line hint, and the
 * raw link so it is obvious which URL is about to be opened.
 */
const LinkButton: React.FC<LinkButtonProps> = ({ link, onPress }) => {
  const handlePress = useCallback(() => onPress(link), [link, onPress]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={link.label}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: link.accentColor },
        pressed && styles.pressed,
      ]}>
      <Text style={styles.label}>{link.label}</Text>
      <Text style={styles.description}>{link.description}</Text>
      <Text style={styles.url} numberOfLines={1}>
        {link.url}
      </Text>
    </Pressable>
  );
};

export default memo(LinkButton);
