import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../../src/types/icon";

function CloseInfoIcon(props: IconProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 16 16" fill="none" {...props}>
      <Path d="M.5 8a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" fill="#F9E789" />
      <Path d="M.5 8a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" stroke="#0B0D11" />
      <Path
        d="M11.676 11.676L4.324 4.324M4.324 11.676l7.352-7.352"
        stroke="#0B0D11"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default CloseInfoIcon;
