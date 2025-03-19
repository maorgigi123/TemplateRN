import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SEARCH_DETAILES, SearchStackParamList } from "../../types/navigation";
import Animated, { FadeIn, FadeInDown, SlideInRight } from "react-native-reanimated";

const ListingDetails: React.FC = () => {
  const route = useRoute<RouteProp<SearchStackParamList, typeof SEARCH_DETAILES>>();
  const { item, index } = route.params;
  const { width } = useWindowDimensions();

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Animated.View style={styles.container} entering={SlideInRight.duration(500)}>
      <Animated.Image
        sharedTransitionTag="sharedTag"
        source={{ uri: item.images[index] }}
        style={[styles.image, { width: width, height: width }]}
        onLoad={() => setIsImageLoaded(true)}
        entering={FadeIn.duration(400)}
      />

      {!isImageLoaded ? (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      ) : (
        <Animated.View
          style={styles.textContainer}
          entering={FadeInDown.delay(200)}
        >
          <Text style={styles.textName}>{item.title}</Text>
          <Text style={styles.textLocation}>{item.description}</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  textContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    bottom: 10,
    left: 10,
    right: 10,
    padding: 16,
    borderRadius: 20,
  },
  textName: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  textLocation: {
    color: 'white',
    fontSize: 16,
  },
});

export default ListingDetails;
