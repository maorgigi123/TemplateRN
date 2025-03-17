import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import { SCREEN_WIDTH } from "../../utils/details";
import { IListing } from "../../types/response";
import { Theme } from "../../../store/user/user.types";

interface ListingCardProps {
  item: IListing;
  themeColor: any;
  fonts: { type: { demibold: string } };
}

const ListingCard: React.FC<ListingCardProps> = ({ item, themeColor, fonts }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    // Calculate index using FlatList width (SCREEN_WIDTH - 40)
    let index = Math.floor(offsetX / (SCREEN_WIDTH - 40));
    // Clamp the index to ensure it doesn't exceed the last valid index
    index = Math.min(index, item.images.length - 1);
    setCurrentIndex(index);
  };

  return (
    <View style={[styles.card, { width: SCREEN_WIDTH - 40 }]}>
      <View style={{ height: 300 }}>
        {item.images && item.images.length > 0 ? (
          <>
          <FlatList
                data={item.images}
                keyExtractor={(img, idx) => idx.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    const index = Math.round(offsetX / (SCREEN_WIDTH - 40));
                    setCurrentIndex(index);
                }}
                scrollEventThrottle={16} // Ensures smooth and frequent updates
                renderItem={({ item: img }) => (
                    <Image
                    source={{ uri: img }}
                    style={{ width: SCREEN_WIDTH - 40, height: 300 }}
                    resizeMode="cover"
                    />
                )}
                />


            <View style={styles.dotContainer}>
            <AnimatedDotsCarousel
                    length={item.images.length}
                    currentIndex={currentIndex}
                    maxIndicators={4}
                    interpolateOpacityAndColor={true}
                    activeIndicatorConfig={{
                        color: themeColor.PRIMARY_BUTTON,
                        margin: 3,
                        opacity: 1,
                        size: 8,
                    }}
                    inactiveIndicatorConfig={{
                        color: "white",
                        margin: 3,
                        opacity: 0.5,
                        size: 8,
                    }}
                    decreasingDots={[
                        {
                        config: { color: "white", margin: 3, opacity: 0.5, size: 6 },
                        quantity: 1,
                        },
                        {
                        config: { color: "white", margin: 3, opacity: 0.5, size: 4 },
                        quantity: 1,
                        },
                    ]}
                    />

            </View>
          </>
        ) : (
          <Text>No images available</Text>
        )}
      </View>
      <View style={styles.overlay}>
        <Text style={{ color: "white", fontSize: 18, fontFamily: fonts.type.demibold }}>
          {item.title}
        </Text>
        <Text style={{ color: "white", fontSize: 14 }}>{item.location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  dotContainer: {
    position: "absolute",
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    zIndex: 9999,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default ListingCard;
