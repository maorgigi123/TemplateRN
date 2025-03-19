import React from "react";
import { SearchScreen, ListingDetails } from "../../screens";
import { SEARCH_DETAILES, SEARCH_SCREEN } from "../../types/navigation";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const ListingStack: React.FC = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={SEARCH_SCREEN} component={SearchScreen} options={{ headerShown : false ,animation: 'slide_from_right'}} />
      <Stack.Screen name={SEARCH_DETAILES} component={ListingDetails}   options={{
          headerShown: false,
          animation: 'slide_from_right',
        }} />
    </Stack.Navigator>
  );
};

export default ListingStack;
