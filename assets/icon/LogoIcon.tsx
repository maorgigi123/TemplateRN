import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { IconProps } from "../../src/types/icon";
import { StatusBar, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useEffect } from "react";

type LogoIcon = {
  noDefaultStyles?: boolean;
  fadeIn?: { delay: number; duration: number };
} & IconProps;

function LogoIcon({ style, noDefaultStyles, fadeIn, ...props }: LogoIcon) {
  const animationSharedValue = useSharedValue(0);

  useEffect(() => {
    if (fadeIn) {
      // Apply delay and duration for fade-in animation
      animationSharedValue.value = withDelay(
        fadeIn.delay, // Delay time
        withTiming(1, { duration: fadeIn.duration }) // Duration of the fade-in animation
      );
    } else {
      // No fade-in, set the value directly
      animationSharedValue.value = withTiming(1);
    }
  }, [fadeIn]);

  const animationStyles = useAnimatedStyle(() => {
    const opacity = interpolate(animationSharedValue.value, [0, 1], [0, 1]);
    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        StyleSheet.flatten([
          style,
          !noDefaultStyles && {
            position: "absolute",
            top: 100 - (StatusBar.currentHeight ? StatusBar.currentHeight : 0),
          },
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]),
        fadeIn ? animationStyles : undefined,
      ]}
      {...props}
    >

<Svg width={122.76} height={28.14} viewBox="0 0 122.76 28.14" {...props}>
    <Path
      d="M 0 0.33 L 5.13 0.33 L 10.71 16.86 L 10.83 16.86 L 16.59 0.33 L 21.63 0.33 L 21.63 21.54 L 18.06 21.54 L 18.06 6.09 L 17.97 6.09 L 12.6 21.54 L 8.88 21.54 L 3.66 6.09 L 3.57 6.09 L 3.57 21.54 L 0 21.54 L 0 0.33 Z M 85.74 13.41 L 80.67 13.41 L 80.67 10.26 L 89.4 10.26 L 89.4 12.99 A 11.154 11.154 0 0 1 88.994 16.039 A 9.956 9.956 0 0 1 88.5 17.4 Q 87.6 19.41 85.635 20.625 A 7.493 7.493 0 0 1 83.546 21.492 Q 82.615 21.731 81.52 21.806 A 15.126 15.126 0 0 1 80.49 21.84 Q 75.9 21.84 73.41 19.035 A 9.055 9.055 0 0 1 71.582 15.731 Q 71.148 14.371 70.998 12.724 A 19.981 19.981 0 0 1 70.92 10.92 Q 70.92 7.293 72.082 4.841 A 8.448 8.448 0 0 1 73.41 2.82 A 8.094 8.094 0 0 1 77.826 0.302 A 12.303 12.303 0 0 1 80.49 0.03 A 11.383 11.383 0 0 1 82.9 0.276 A 9.256 9.256 0 0 1 84.795 0.9 Q 86.7 1.77 87.885 3.375 A 7.43 7.43 0 0 1 89.187 6.369 A 9.128 9.128 0 0 1 89.31 7.17 L 85.56 7.17 A 5.668 5.668 0 0 0 85.221 5.845 A 3.957 3.957 0 0 0 84.03 4.2 A 4.201 4.201 0 0 0 82.597 3.459 Q 81.998 3.276 81.277 3.213 A 9.036 9.036 0 0 0 80.49 3.18 A 7.037 7.037 0 0 0 78.737 3.385 A 4.635 4.635 0 0 0 76.125 5.085 Q 74.727 6.916 74.672 10.616 A 20.595 20.595 0 0 0 74.67 10.92 Q 74.67 14.85 76.125 16.77 A 4.694 4.694 0 0 0 79.047 18.555 A 7.284 7.284 0 0 0 80.49 18.69 A 9.272 9.272 0 0 0 81.438 18.644 Q 82.132 18.573 82.68 18.39 Q 83.58 18.09 84.165 17.55 Q 84.75 17.01 85.095 16.32 Q 85.44 15.63 85.575 14.88 Q 85.71 14.13 85.74 13.41 Z"
      stroke="#000"
      strokeWidth="1"
      fill="#000"
    />
  </Svg>
    </Animated.View>
  );
}

export default LogoIcon;
