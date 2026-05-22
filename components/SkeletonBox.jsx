import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function SkeletonBox({ width = '100%', height = 16, borderRadius = 8, style }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.85, duration: 750, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 750, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width, height, borderRadius, backgroundColor: 'rgba(255,255,255,0.08)', opacity },
        style,
      ]}
    />
  );
}
