import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid, Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { useDispatch } from "react-redux";
import { SetLocation  as setCurrentLocation} from "../../store/user/user.action";

export const useUserLocation = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const requestPermissionAndGetLocation = async () => {
      try {
        let hasPermission = false;

        if (Platform.OS === "android") {
          // עבור אנדרואיד - בקשה להעניק הרשאת מיקום
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
        } else if (Platform.OS === "ios") {
          const auth = await Geolocation.requestAuthorization("whenInUse"); // או "always" לפי הצורך
          hasPermission = auth === "granted";
        }

        console.log('premison ',hasPermission)
        if (!hasPermission) {
          setError("Location permission denied");
          return;
        }
        // אם יש הרשאה, קבלת המיקום
        Geolocation.getCurrentPosition(
          (position) => {
            dispatch(setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }));
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            console.log('get postion')
          },
          (err) => setError(err.message),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } catch (err) {
        setError("An error occurred while requesting location");
      }
    };

    requestPermissionAndGetLocation();
  }, []);

  return { location, error };
};
