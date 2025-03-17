import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BOTTOM_TABS, ERROR } from "../types/navigation";
import { ErrorScreen } from "../screens";
import BottomTabsNavigator from "./BottomTabsNavigator";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return ( // <-- Missing return statement was added here
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        animation: "fade",
      })}
      initialRouteName={BOTTOM_TABS}
    >
      <Stack.Screen name={BOTTOM_TABS} component={BottomTabsNavigator} />
      <Stack.Screen name={ERROR} component={ErrorScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
