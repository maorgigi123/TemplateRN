import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SEARCH_DETAILES, SearchStackParamList } from "../../types/navigation";
import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { currencyCalc } from "../../utils/currencyCalc";
import { useTheme } from "../../hooks/useTheme";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

const ListingDetails: React.FC = () => {
  const route = useRoute<RouteProp<SearchStackParamList, typeof SEARCH_DETAILES>>();
  const { item, index } = route.params;

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<SearchStackParamList>>();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const colorTheme = useTheme();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View style={[headerAnimatedStyle, styles.header,{backgroundColor:colorTheme.BACKGROUND,borderColor: colorTheme.LINE_BREAK}]} />
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={[styles.roundButton,{ backgroundColor: colorTheme.BACKGROUND}]} onPress={() => {}}>
            <Ionicons name="share-outline" size={22} color={colorTheme.TEXT} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.roundButton,{ backgroundColor: colorTheme.BACKGROUND}]}>
            <Ionicons name="heart-outline" size={22} color={colorTheme.TEXT} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={[styles.roundButton,{ backgroundColor: colorTheme.BACKGROUND}]} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colorTheme.TEXT} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-IMG_HEIGHT, 0, IMG_HEIGHT],
          [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
        ),
      },
      {
        scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
      },
    ],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
  }), []);

  return (
    <View style={[styles.container,{backgroundColor:colorTheme.BACKGROUND}]}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.Image
          sharedTransitionTag={item.id}
          source={{ uri: item.images[index] }}
          style={[styles.image, imageAnimatedStyle,{height: isImageLoaded ? IMG_HEIGHT : 0}]}
          onLoad={() => setIsImageLoaded(true)}
          resizeMode="cover"
        />
        {/* Show skeleton placeholder until image loads */}
        {!isImageLoaded && (
          <SkeletonPlaceholder borderRadius={10}>
            <View style={styles.skeleton} />
          </SkeletonPlaceholder>
        )}


        <View style={[styles.infoContainer,{backgroundColor: colorTheme.BACKGROUND}]}>
          <Text style={[styles.name,{color:colorTheme.TEXT}]}>{item.title}</Text>
          <Text style={[styles.rooms,{color:colorTheme.TEXT}]}>{item.description}</Text>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16}  color={colorTheme.TEXT}/>
            <Text style={[styles.ratings,{color:colorTheme.TEXT}]}>5 · 10 reviews</Text>
          </View>

          <View style={[styles.divider,{backgroundColor: colorTheme.LINE_BREAK}]} />
            <View style={styles.hostView}>
              <Image source={{ uri: item.owner.profile_image }} style={[styles.host,{backgroundColor: colorTheme.LINE_BREAK}]} />
              <View>
                <Text style={[styles.hostName,{color:colorTheme.TEXT}]}>Hosted by {item.owner.name}</Text>
                <Text style={[styles.hostSince,{color: colorTheme.TEXT}]}>Host since {new Date(item.createdAt).toLocaleDateString()}</Text>
              </View>
            </View>
            <View style={[styles.divider,{backgroundColor: colorTheme.LINE_BREAK}]} />
            {/* Render description several times */}
          {[...Array(15)].map((_, i) => (
            <Text key={i} style={[styles.description,{color:colorTheme.TEXT}]}>
              {item.description}
            </Text>
          ))}
        </View>
      </Animated.ScrollView>
      {isImageLoaded && (
        <Animated.View style={[styles.footer,{borderTopColor: colorTheme.LINE_BREAK,backgroundColor:colorTheme.BACKGROUND}]} entering={SlideInDown.delay(200)}>
          <View style={styles.footerContent}>
            <TouchableOpacity style={styles.footerText}>
              <Text style={[styles.footerPrice,{color:colorTheme.TEXT}]}>{currencyCalc(item.currency)} {item.price}</Text>
              <Text style={{color:colorTheme.TEXT}}>pre hour</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { paddingHorizontal: 20 ,backgroundColor :colorTheme.PRIMARY_BUTTON}]}>
              <Text style={[styles.btnText,{color:colorTheme.WHITE}]}>Order</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width },
  skeleton: { width, height: IMG_HEIGHT },
  infoContainer: { padding: 24 },
  name: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  rooms: { fontSize: 16, marginVertical: 4 },
  ratingContainer: { flexDirection: "row", alignItems: "center", gap: 4 },
  ratings: { fontSize: 16 },
  divider: { height: StyleSheet.hairlineWidth, marginVertical: 16 },
  hostView: { flexDirection: "row", alignItems: "center", gap: 12 },
  host: { width: 50, height: 50, borderRadius: 50 },
  hostName: { fontWeight: "500", fontSize: 16 },
  hostSince: { fontSize: 14 },
  roundButton: { width: 40, height: 40, borderRadius: 50, alignItems: "center", justifyContent: "center" },
  bar: { flexDirection: "row", alignItems: "center", gap: 10 },
  header: {height: 100, borderBottomWidth: StyleSheet.hairlineWidth },
  description: { fontSize: 16, marginTop: 10 },
  footer: {
    position: "absolute",
    height: 80,
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  footerText: { flexDirection: "row", alignItems: "center", gap: 4 },
  footerPrice: { fontSize: 18 },
  btn: { height: 50, borderRadius: 8, justifyContent: "center", alignItems: "center" },
  btnText: {fontSize: 16 },
});

export default ListingDetails;
