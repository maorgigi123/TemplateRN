import LottieView from "lottie-react-native";
import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicatorProps,
} from "react-native";
import { LoaderLottie } from "../../../assets";

interface LoaderProps extends ActivityIndicatorProps {}
const Loader = ({ ...props }: LoaderProps) => {
  return (
    <View style={[styles.container,{backgroundColor:'rgba(0,0,0,.5)'}]} {...props}>
      <LottieView
        autoPlay
        loop
        speed={1}
        style={{ height: 300, width: 300 }}
        source={LoaderLottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers content vertically (only works in flex container)
    alignItems: 'center', // Centers content horizontally (only works in flex container)
    position: 'absolute', // Position it absolutely
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Make sure the container spans the full parent
    zIndex:9999
  },
  
});

export default Loader;
