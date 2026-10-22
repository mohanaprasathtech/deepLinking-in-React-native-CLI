import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';

import type { LinkItem } from '../../types/link.types';
import { styles } from './LinkCard.styles';

interface LinkCardProps {
  link: LinkItem;
  /** Position in the list — used to stagger the entrance animation. */
  index: number;
  onPress: (link: LinkItem) => void;
}

/**
 * One row in the home screen list: a brand-coloured icon tile, the title,
 * a one-line hint, and the real link in a small pill.
 *
 * It slides up when the screen opens and squishes slightly while pressed.
 */
const LinkCard: React.FC<LinkCardProps> = ({ link, index, onPress }) => {
  // 0 = hidden and slightly lower, 1 = in place.
  const entrance = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 420,
      // Each card starts a little after the one above it.
      delay: 120 + index * 90,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [entrance, index]);

  const animateTo = useCallback(
    (value: number) => {
      Animated.spring(pressScale, {
        toValue: value,
        useNativeDriver: true,
        speed: 40,
        bounciness: 6,
      }).start();
    },
    [pressScale],
  );

  const handlePressIn = useCallback(() => animateTo(0.97), [animateTo]);
  const handlePressOut = useCallback(() => animateTo(1), [animateTo]);
  const handlePress = useCallback(() => onPress(link), [link, onPress]);

  const translateY = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [22, 0],
  });

  const isPreview = link.openMode === 'inAppPreview';

  return (
    <Animated.View
      style={{
        opacity: entrance,
        transform: [{ translateY }, { scale: pressScale }],
      }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${link.label}. ${link.description}`}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}>
        <View
          style={[
            styles.iconTile,
            {
              backgroundColor: link.accentColor,
              shadowColor: link.accentColor,
            },
          ]}>
          <Text style={styles.iconGlyph}>{link.icon}</Text>
        </View>

        <View style={styles.body}>
          <Text style={[styles.category, { color: link.accentColor }]}>
            {link.category}
          </Text>
          <Text style={styles.title}>{link.label}</Text>
          <Text style={styles.description}>{link.description}</Text>

          <View style={styles.urlPill}>
            <Text style={styles.urlText} numberOfLines={1}>
              {link.url}
            </Text>
          </View>
        </View>

        <View style={styles.chevron}>
          <Text style={[styles.chevronGlyph, { color: link.accentColor }]}>
            {isPreview ? '▶' : '↗'}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default memo(LinkCard);
