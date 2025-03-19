import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import HapticFeedback from "react-native-haptic-feedback";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../hooks/useTheme";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// const categories = [
//   { name: 'Trending', icon: 'local-fire-department' },
//   { name: 'Tiny homes', icon: 'home' },
//   { name: 'Cabins', icon: 'house-siding' },
//   { name: 'Trending', icon: 'local-fire-department' },
//   { name: 'Play', icon: 'videogame-asset' },
//   { name: 'City', icon: 'apartment' },
//   { name: 'Beachfront', icon: 'beach-access' },
//   { name: 'Countryside', icon: 'nature-people' },
// ];
const categories = [
  { name: 'Trending', icon: 'local-fire-department' },
  { name: 'Photography Equipment', icon: 'camera' },
  { name: 'Sports Equipment', icon: 'sports-handball' },
  { name: 'Musical Instruments', icon: 'music-note' },
  { name: 'Party Supplies', icon: 'celebration' },
  { name: 'Boats & Water Sports', icon: 'directions-boat' },
  { name: 'Tools & Machines', icon: 'build' },
  { name: 'Winter Sports Gear', icon: 'snowboarding' },
  { name: 'Camping & Hiking', icon: 'hiking' },
  { name: 'Electronics', icon: 'devices' },
];


interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreScreen = ({ onCategoryChanged }: Props) => {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  // @ts-ignore
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const colorTheme = useTheme()
  const selectCategory = (index: number) => {
    setActiveIndex(index);
    itemsRef.current[index]?.measure((x: number, y: number, width: number, height: number) => {
      scrollRef.current?.scrollTo({ x: x - 34, y: 0, animated: true });
    });
    

    // Trigger haptic feedback
    HapticFeedback.trigger("impactLight");

    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorTheme.BACKGROUND }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={() => {}}>
            <View style={[styles.searchBtn,{ borderColor: colorTheme.TEXT}]}>
              {/* <Ionicons name="search" size={24} /> */}
              <View>
                <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
                <Text style={{ color: 'gray', fontFamily: 'mon' }}>Anywhere · Any week</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterBtn,,{ borderColor: colorTheme.TEXT}]}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              ref={(el) => {
                itemsRef.current[index] = el;
              }}         
               key={index}
              style={activeIndex === index ? [styles.categoriesBtnActive,{borderBottomColor:colorTheme.TEXT}] : styles.categoriesBtn}
              onPress={() => selectCategory(index)}
            >
              <MaterialIcons name={item.icon} size={24} color={activeIndex === index ? '#000' : 'grey'} />
              <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 1, height: 10 },
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  searchBtn: {
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    alignItems: 'center',
    width: 280,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 1 },
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 24,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: 'grey',
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});

export default ExploreScreen;
