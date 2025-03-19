import React from "react";
import {
  AccessibilityProps,
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import CustomText, { CustomTextProps } from "../CustomText/CustomText";
import { styles } from "./CustomButtonStyle";
import { useTheme } from "../../hooks/useTheme";

export type CustomButtonProps = {
  text?: string;
  textProps?: CustomTextProps;
  accProps?: AccessibilityProps;
  inverted?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
} & TouchableOpacityProps;

const CustomButton = ({
  text = "",
  textProps = {},
  inverted = false,
  isLoading = false,
  fullWidth,
  accProps = {},
  disabled = false, 
  ...props
}: CustomButtonProps) => {
  const colorTheme = useTheme();
  return (
    <TouchableOpacity
      accessibilityRole="button"
      {...props}
      {...accProps}
      disabled={disabled || isLoading} 
      style={[
        styles.btn,{ backgroundColor: colorTheme.BLACK},
        inverted && { backgroundColor: "white" },
        fullWidth && { width: "100%" },
        props.style,
        disabled ? styles.disabled : {},
      ]}
      onPress={(event) => {
        isLoading ? null : props.onPress && props.onPress(event);
      }}
    >
      {text === "" ? (
        props.children
      ) : (
        <CustomText
          {...textProps}
          {...accProps}
          style={[
            styles.text,
            {
              color: inverted ? "black" : "white",
            },
            textProps.style,
            disabled ? styles.disabledText : {},
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color={"white"} size={"small"} />
          ) : (
            text
          )}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
