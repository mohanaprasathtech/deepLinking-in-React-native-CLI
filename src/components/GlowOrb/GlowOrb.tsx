import React, { memo, useMemo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  container: { position: 'absolute' },
  ring: { position: 'absolute' },
});

interface GlowOrbProps {
  /** Width/height of the whole glow. */
  size: number;
  /** Colour of the light. */
  color: string;
  /** Where to put it, e.g. `{ top: -80, left: -60 }`. */
  position: ViewStyle;
  /** More layers = smoother fade. */
  layers?: number;
  /** Opacity of each single layer. They stack up towards the centre. */
  layerOpacity?: number;
}

/**
 * A soft circle of coloured light used in the background.
 *
 * React Native has no blur or radial-gradient built in, so we fake it:
 * we stack several circles of the same colour inside each other, each one
 * slightly smaller and quite transparent. Where many circles overlap (the
 * middle) the colour builds up and looks bright; near the edge only one
 * circle is left, so it fades out softly.
 */
const GlowOrb: React.FC<GlowOrbProps> = ({
  size,
  color,
  position,
  // Many thin layers rather than a few thick ones: with few layers you can
  // see the individual circle edges as rings, which ruins the illusion.
  layers = 28,
  layerOpacity = 0.009,
}) => {
  const rings = useMemo(
    () =>
      Array.from({ length: layers }, (_, index) => {
        // index 0 is the biggest ring, the last one is the smallest.
        const ringSize = size * (1 - index / layers);
        return {
          key: index,
          width: ringSize,
          height: ringSize,
          borderRadius: ringSize / 2,
          left: (size - ringSize) / 2,
          top: (size - ringSize) / 2,
        };
      }),
    [layers, size],
  );

  return (
    <View
      pointerEvents="none"
      style={[styles.container, { width: size, height: size }, position]}>
      {rings.map(ring => (
        <View
          key={ring.key}
          style={[
            styles.ring,
            {
              width: ring.width,
              height: ring.height,
              borderRadius: ring.borderRadius,
              left: ring.left,
              top: ring.top,
              backgroundColor: color,
              opacity: layerOpacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

export default memo(GlowOrb);
