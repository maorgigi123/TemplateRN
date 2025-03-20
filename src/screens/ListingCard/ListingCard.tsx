import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import { SCREEN_WIDTH } from "../../utils/details";
import { IListing } from "../../types/response";
import {ILocation} from '../../../store/user/user.reducer'
import { calculateDistance } from "../../utils/calculateDistance";
import { IColor } from "../../components/Colors/Color";
import { currencyCalc } from "../../utils/currencyCalc";
import { statusCalc } from "../../utils/statusCalc";
import FastImage from "react-native-fast-image";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {SEARCH_DETAILES, SearchStackParamList } from "../../types/navigation";
import Animated from "react-native-reanimated";
interface ListingCardProps {
  item: IListing;
  themeColor: IColor;
  fonts: { type: { demibold: string } };
  location : ILocation;
}

const ListingCard: React.FC<ListingCardProps> = React.memo(({ item, themeColor, fonts, location }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loadingImages, setLoadingImages] = useState<boolean[]>(item.images.map(() => true)); // Track loading state for images
  const navigation = useNavigation<NativeStackNavigationProp<SearchStackParamList>>();

  const handleImageLoad = (index: number) => {
    setLoadingImages((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };
  return (
    <View style={[styles.card, { width: SCREEN_WIDTH - 40 }]}>
      <View style={{ height: 300 }}>
        {item.images && item.images.length > 0 ? (
          <>
        <FlatList
              data={item.images}
              keyExtractor={(_, idx) => idx.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(event) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / (SCREEN_WIDTH - 40));
                setCurrentIndex(index);
              }}
              initialNumToRender={1}
              windowSize={5}
              getItemLayout={(data, index) => ({
                length: SCREEN_WIDTH - 40,
                offset: (SCREEN_WIDTH - 40) * index,
                index,
              })}
              scrollEventThrottle={16}
              renderItem={({ item: img, index }) => (
                <View>
                  {loadingImages[index] && (
                    <SkeletonPlaceholder borderRadius={10}>
                      <View style={styles.skeleton} />
                    </SkeletonPlaceholder>
                  )}
                      <Pressable onPress={() => navigation.navigate(SEARCH_DETAILES,{item:item,index:index})}>
                        <Animated.Image
                          sharedTransitionTag={item.id}
                          source={{ uri: img }}
                            style={[styles.image, loadingImages[index] ? { opacity: 0 } : { opacity: 1 }]}
                            resizeMode={FastImage.resizeMode.cover}
                            onLoad={() => handleImageLoad(index)} // Hide skeleton on load
                          />
                      </Pressable>
                </View>
              )}
            />


            <View style={styles.dotContainer}>
            <AnimatedDotsCarousel
                    length={item.images.length}
                    currentIndex={currentIndex}
                    maxIndicators={1}
                    interpolateOpacityAndColor={true}
                    activeIndicatorConfig={{
                        color: themeColor.WHITE,
                        margin: 3,
                        opacity: .8,
                        size: 7,
                    }}
                    inactiveIndicatorConfig={{
                        color: "white",
                        margin: 3,
                        opacity: 0.5,
                        size: 6,
                    }}
                    decreasingDots={[
                        {
                        config: { color: "white", margin: 3, opacity: 0.5, size: 5 },
                        quantity: 1,
                        },
                        {
                        config: { color: "white", margin: 3, opacity: 0.5, size: 3 },
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
        <Text style={{ color: themeColor.TEXT, fontSize: 18, fontFamily: fonts.type.demibold }}>
          {item.title}
        </Text>
        {
        (location.latitude != null && location.longitude!=null && item.location.latitude != null && item.location.longitude != null) ? 
        <Text style={{ color: themeColor.TEXT, fontSize: 15,fontWeight:'bold' }}>
        {parseFloat(calculateDistance(location.latitude, location.longitude, item.location.latitude, item.location.longitude).toFixed(2)).toString()}
        {" km"}
        </Text>
        :
        <Text style={{ color: "white", fontSize: 14 }}>{item.location.city}</Text>
        }
       <Text style={{ color: themeColor.TEXT, fontSize: 18, fontFamily: fonts.type.demibold }}>
        {item.price} {currencyCalc(item.currency)}
      </Text>
      <Text
          style={{
            color: statusCalc(item.status),
            fontSize: 18,
            fontFamily: fonts.type.demibold,
          }}
        >
          {item.status}
        </Text>

      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display:'flex',
    alignItems:'flex-end',
    gap:2
  },
  skeleton: {
    width: SCREEN_WIDTH - 40,
    height: 300,
    backgroundColor: "#e0e0e0",
  },
  image: {
    width: SCREEN_WIDTH - 40,
    height: 300,
  },
});

export default ListingCard;
