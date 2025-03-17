import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ErrorScreen, LoginScreen, RegisterScreen } from "../screens";
import { ERROR, LOGIN,REGISTER } from "../types/navigation";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator 
        initialRouteName={LOGIN} 
        screenOptions={{ 
            headerShown: false, 
            gestureEnabled: true // Enable swipe back
        }}
    >
        <Stack.Screen name={LOGIN} component={LoginScreen} />
        <Stack.Screen 
            name={REGISTER} 
            component={RegisterScreen} 
            options={{ gestureEnabled: true }} // Ensure it's enabled per screen
        />
         <Stack.Screen name={ERROR} component={ErrorScreen} />
    </Stack.Navigator>
    )
};

export default AuthNavigator;