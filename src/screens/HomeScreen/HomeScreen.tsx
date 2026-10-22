import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Easing,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import FloatingVideoPlayer from '../../components/FloatingVideoPlayer/FloatingVideoPlayer';
import GlowOrb from '../../components/GlowOrb/GlowOrb';
import LinkCard from '../../components/LinkCard/LinkCard';
import { DEEP_LINKS } from '../../config/links.config';
import { openExternalLink } from '../../services/deepLink.service';
import { colors } from '../../theme/colors';
import type { LinkItem } from '../../types/link.types';
import { styles } from './HomeScreen.styles';

/**
 * Main screen: a short header and one card per link.
 *
 * Amazon / Flipkart leave the app and land in their own app (via the OS or
 * the browser). YouTube stays here and opens the floating mini player.
 */
const HomeScreen: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // The header fades in just before the cards start sliding up.
  const headerEntrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerEntrance, {
      toValue: 1,
      duration: 480,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [headerEntrance]);

  const handleLinkPress = useCallback(async (link: LinkItem) => {
    if (link.openMode === 'inAppPreview') {
      setPreviewUrl(link.url);
      return;
    }

    const result = await openExternalLink(link.url);
    if (!result.success) {
      Alert.alert('Cannot open link', result.message);
    }
  }, []);

  const handleClosePreview = useCallback(() => setPreviewUrl(null), []);

  const headerTranslate = headerEntrance.interpolate({
    inputRange: [0, 1],
    outputRange: [-14, 0],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Soft coloured light in the corners, behind everything else. */}
      <GlowOrb
        size={460}
        color={colors.amazon}
        position={{ top: -170, left: -150 }}
      />
      <GlowOrb
        size={520}
        color={colors.flipkart}
        position={{ bottom: -220, right: -190 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerEntrance,
              transform: [{ translateY: headerTranslate }],
            },
          ]}>
          <View style={styles.pill}>
            <View style={styles.pillDot} />
            <Text style={styles.pillText}>Deep linking demo</Text>
          </View>

          <Text style={styles.title}>
            One tap,{'\n'}
            <Text style={styles.titleAccent}>anywhere</Text> you want.
          </Text>

          <Text style={styles.subtitle}>
            Shopping links hand off to their own app. The video never leaves
            this screen.
          </Text>
        </Animated.View>

        {DEEP_LINKS.map((link, index) => (
          <LinkCard
            key={link.id}
            link={link}
            index={index}
            onPress={handleLinkPress}
          />
        ))}

        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>Tap a card to try it</Text>
          <View style={styles.footerLine} />
        </View>
      </ScrollView>

      {/* Rendered last so it floats above the cards. */}
      {previewUrl && (
        <FloatingVideoPlayer
          videoUrl={previewUrl}
          onClose={handleClosePreview}
        />
      )}
    </View>
  );
};

export default HomeScreen;
