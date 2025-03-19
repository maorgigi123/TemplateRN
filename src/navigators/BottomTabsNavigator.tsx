import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { Platform, TouchableOpacity, View } from "react-native";
import HapticFeedback from "react-native-haptic-feedback";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import from react-native-vector-icons

import { MessagesScreen, ProfileScreen, RentalScreen } from "../screens";
import { PROFILE, MESSAGES, SEARCH, RENTAL } from "../types/navigation";
import ListingStack from "../screens/ListingStack";
import { useTheme } from "../hooks/useTheme";

const handleTabPress = () => {
  HapticFeedback.trigger("selection", {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
};

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  const { t } = useTranslation();
  const colorTheme = useTheme();
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
              color={focused ? colorTheme.PRIMARY_BUTTON_HOVER : colorTheme.LINE_BREAK}
            />
          );
        },


        tabBarButton: (props) => (
          <TouchableOpacity
            {...Object.fromEntries(
              Object.entries(props).filter(([_, v]) => v !== null)
            )}            
            disabled={props.disabled ?? false}  // Ensure it's always boolean
            onPress={(e) => {
              handleTabPress();
              props.onPress?.(e);
            }}
            delayLongPress={props.delayLongPress ?? 300} // Use a default number instead of null
          />
        ),
        
        
        
        
        tabBarLabelStyle: { color: colorTheme.TEXT, fontSize: 12 },
        tabBarStyle: {
          paddingBottom: Platform.OS === "android" ? 20 : 28,
          height: 80,
          backgroundColor:colorTheme.BACKGROUND
        },
      })}
    >
      <Tab.Screen name={PROFILE} component={ProfileScreen}/> 
      <Tab.Screen name={MESSAGES} component={MessagesScreen} />
      <Tab.Screen name={RENTAL} component={RentalScreen} />
      <Tab.Screen name={SEARCH} component={ListingStack}/>

    </Tab.Navigator>
  
  );
};

export default BottomTabsNavigator;
