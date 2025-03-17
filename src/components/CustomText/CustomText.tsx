import React, { forwardRef } from "react";
import { Text, TextProps } from "react-native";
import { styles } from "./CustomTextStyle";
import Animated from "react-native-reanimated";

export type CustomTextProps = TextProps & {};

const CustomText = forwardRef<Text, TextProps>((props, ref) => {
  return (
    <Animated.Text ref={ref} {...props} style={[styles.text, props.style]} />
  );
});

export default CustomText;
