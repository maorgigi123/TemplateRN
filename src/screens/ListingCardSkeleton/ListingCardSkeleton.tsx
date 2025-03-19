import React from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import SkeletonPlaceholder from "react-native-skeleton-placeholder"; // Skeleton loading library
import { SCREEN_WIDTH } from "../../utils/details";

const ListingCardSkeleton: React.FC = React.memo(() => {
  const themeColor = useTheme();

  return (
    <SkeletonPlaceholder
      backgroundColor={themeColor.GrayBackground} // Or any color based on your theme
      highlightColor={themeColor.BACKGROUND} // Light highlight color
    >
      <View style={[styles.card, { width: SCREEN_WIDTH - 40 }]}>
        <View style={styles.imageSkeleton} />
        <View style={styles.overlay}>
          <View style={styles.titleSkeleton} />
          <View style={styles.subtitleSkeleton} />
          <View style={styles.priceSkeleton} />
          <View style={styles.statusSkeleton} />
        </View>
      </View>
    </SkeletonPlaceholder>
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
  imageSkeleton: {
    width: SCREEN_WIDTH - 40,
    height: 300,
    borderRadius: 10,
    backgroundColor: "#E1E9EE", // Placeholder background for image
  },
  overlay: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: "flex",
    alignItems: "flex-end",
    gap: 5,
  },
  titleSkeleton: {
    height: 20,
    width: "60%",
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: "#E1E9EE", // Placeholder background for title
  },
  subtitleSkeleton: {
    height: 15,
    width: "40%",
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: "#E1E9EE", // Placeholder background for subtitle
  },
  priceSkeleton: {
    height: 15,
    width: "50%",
    borderRadius: 4,
    backgroundColor: "#E1E9EE", // Placeholder background for price
  },
  statusSkeleton: {
    height: 15,
    width: "40%",
    borderRadius: 4,
    backgroundColor: "#E1E9EE", // Placeholder background for status
  },
});

export default ListingCardSkeleton;
