import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../src/types/icon"
function BackArrowIcon(props: IconProps) {
  return (
    <Svg width="9" height="20" viewBox="0 0 9 20" fill="none" {...props}>
      <Path
        d="M0.5 19L8.5 10L0.500002 1"
        stroke="#0B0D11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default BackArrowIcon;
