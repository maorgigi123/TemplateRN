import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { Platform, TouchableOpacity } from "react-native";
import HapticFeedback from "react-native-haptic-feedback";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import from react-native-vector-icons

import { MessagesScreen, ProfileScreen, RentalScreen, SearchScreen } from "../screens";
import { TABS_YELLOW } from "../styles/colors";
import { PROFILE, MESSAGES, SEARCH, RENTAL } from "../types/navigation";

const handleTabPress = () => {
  HapticFeedback.trigger("selection", {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
};

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={SEARCH}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: t(`bottomTabs.${route.name}`) || route.name,
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case PROFILE:
              iconName = focused ? "person" : "person-outline";
              break;
            case RENTAL:
              iconName = focused ? "basket" : "basket-outline";
              break;
            case SEARCH:
              iconName = focused ? "search" : "search-outline";
              break;
            case MESSAGES:
               iconName = focused ? "albums" : "albums-outline";
               break;
            default:
              iconName = "help-circle-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={28}
              color={focused ? TABS_YELLOW : "gray"}
            />
          );
        },


        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            disabled={props.disabled ?? false}  // Ensure it's always boolean
            onPress={(e) => {
              handleTabPress();
              props.onPress?.(e);
            }}
            delayLongPress={props.delayLongPress ?? 300} // Use a default number instead of null
          />
        ),
        
        
        
        
        tabBarLabelStyle: { color: "black", fontSize: 12 },
        tabBarStyle: {
          paddingBottom: Platform.OS === "android" ? 20 : 28,
          height: 80,
        },
      })}
    >
      <Tab.Screen name={PROFILE} component={ProfileScreen} />
      <Tab.Screen name={MESSAGES} component={MessagesScreen} />
      <Tab.Screen name={RENTAL} component={RentalScreen} />
      <Tab.Screen name={SEARCH} component={SearchScreen} />

    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
