import React, { useCallback, useState } from 'react';
import { Alert, StatusBar, Text, View } from 'react-native';

import FloatingVideoPlayer from '../../components/FloatingVideoPlayer/FloatingVideoPlayer';
import LinkButton from '../../components/LinkButton/LinkButton';
import { DEEP_LINKS } from '../../config/links.config';
import { openExternalLink } from '../../services/deepLink.service';
import type { LinkItem } from '../../types/link.types';
import { styles } from './HomeScreen.styles';

/**
 * Main screen: three centred buttons.
 *
 * Amazon / Flipkart leave the app and land in their own app (via the OS or
 * the browser). YouTube stays here and opens the floating mini player.
 */
const HomeScreen: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        <Text style={styles.title}>Deep Link Demo</Text>
        <Text style={styles.subtitle}>
          Shopping links open in their own app. The video stays here.
        </Text>

        <View style={styles.buttonGroup}>
          {DEEP_LINKS.map(link => (
            <LinkButton key={link.id} link={link} onPress={handleLinkPress} />
          ))}
        </View>
      </View>

      {/* Rendered last so it floats above the buttons. */}
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
