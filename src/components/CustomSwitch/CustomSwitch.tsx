import React from "react";
import { StyleSheet, TouchableWithoutFeedback, ViewProps } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type CustomSwitchProps = {
  isSelected: boolean;
  setSelected: (bool: boolean) => any;
  circleSize?: number;
  disabled?: boolean;
} & ViewProps;

const PADDING = 2;

const CustomSwitch = ({
  isSelected,
  setSelected,
  circleSize = 28,
  disabled = false,
  ...props
}: CustomSwitchProps) => {
  const derivedSelected = useDerivedValue(
    () => withTiming(isSelected ? 1 : 0),
    [isSelected]
  );

  const width = useSharedValue(0);

  const rStyleContainer = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      derivedSelected.value,
      [0, 1],
      ["grey", "green"]
    );
    return {
      backgroundColor,
    };
  });

  const rStyleCircle = useAnimatedStyle(() => {
    const translateX = interpolate(
      derivedSelected.value,
      [0, 1],
      [0, width.value - circleSize - 2 * PADDING]
    );
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!disabled) {
          setSelected(!isSelected);
        }
      }}
    >
      <Animated.View
        {...props}
        style={[styles.container, rStyleContainer, props.style]}
        onLayout={(e) => (width.value = e.nativeEvent.layout.width)}
      >
        <Animated.View
          style={[
            {
              height: circleSize,
              width: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: "white",
            },
            rStyleCircle,
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 50,
    padding: PADDING,
    borderRadius: 100,
    justifyContent: "center",
    transform: [{ rotateZ: "180deg" }],
  },
});
