import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ErrorScreen, SplashScreen,TestScreen } from './src/screens';
import { BOOT, ERROR, PREDEFINED, SPLASH } from './src/types/navigation';
import Boot from './src/navigators/Boot';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PredefinedMenuScreen from './src/screens/PredefinedMenuScreen/PredefinedMenuScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store'; // Adjust the path according to your project structure
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ENVIRONMENT } from "@env";
import RNShake from "react-native-shake";
import NetworkLogger from "react-native-network-logger";
import ErrorBoundary from "react-native-error-boundary";

const Stack = createNativeStackNavigator();

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { retry: 0 },
    queries: { retry: 0 },
  },
});


function App(): React.JSX.Element {

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  useEffect(() => {
    if (ENVIRONMENT === "DEV" || ENVIRONMENT === "TEST") {
      console.log('1')
      const subscription = RNShake.addListener(() => {
        console.log('2')
        console.log(bottomSheetRef.current)
        bottomSheetRef.current?.expand();
      });
      return () => {
        subscription.remove();
      };
    }
  }, []);

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
        <ErrorBoundary FallbackComponent={ErrorScreen}>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                        <Stack.Navigator initialRouteName={SPLASH} screenOptions={{ headerShown: false }}>
                          <Stack.Screen name={SPLASH} component={SplashScreen} />
                          <Stack.Screen name={BOOT} component={Boot} />
                          <Stack.Screen name={PREDEFINED} component={PredefinedMenuScreen} />
                          <Stack.Screen name={ERROR} component={ErrorScreen} />
                          {/* מסכים נוספים */}
                        </Stack.Navigator>
                        <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={["30%", "95%"]}
                    enablePanDownToClose
                    enableContentPanningGesture={false}
                  >
                    <BottomSheetView style={{ flex: 1 }}>
                      <TestScreen sheetRef={bottomSheetRef} />
                      <NetworkLogger />
                    </BottomSheetView>
                  </BottomSheet>
                </PersistGate>
              </Provider>
          </QueryClientProvider>
          </ErrorBoundary>
        </NavigationContainer>
    </GestureHandlerRootView>
  );
}
export default App;
