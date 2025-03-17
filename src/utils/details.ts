import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("screen");

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

const isIos = Platform.OS == "ios" ? true : false;
const isAndroid = Platform.OS == "android" ? true : false;

export { SCREEN_WIDTH, SCREEN_HEIGHT, isAndroid, isIos };
