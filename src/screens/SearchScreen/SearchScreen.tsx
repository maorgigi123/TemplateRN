import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";
import fonts from "../../styles/fonts";
import { CustomButton, Loader } from "../../components"; // Assuming your CustomButton is styled nicely
import api from '../../api/helpers/instance'
import { BASE_URL } from "@env";
const SearchScreen = () => {
  const themeColor = useTheme()
const {t} = useTranslation()
const [user, setUser] = useState<string>("");

const testProtectedRoute = async () => {
  try {
    // Make a GET request to the protected route
    const response = await api.get(BASE_URL); // Assuming the route is at '/'
    // Check the response
    console.log('res ',response.data);
    setUser(response.data.user.email)
  } catch (error) {
    console.error("Error accessing protected route:", error);
  }
};
useEffect(()=>{
  // testProtectedRoute()
},[])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeColor.BACKGROUND,
        justifyContent: "center",
        alignItems: "center", // Center the content horizontally
        paddingHorizontal: 20,
        paddingVertical: 30,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.type.demibold,
          fontSize: 40,
          color: themeColor.TEXT,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        search
      </Text>
      <Text
        style={{
          fontFamily: fonts.type.demibold,
          fontSize: 40,
          color: themeColor.TEXT,
          textAlign: "center",
          marginBottom: 10,
        }}
        >
      this is the user : {user}
      </Text>
     
    </SafeAreaView>
  );
};

export default SearchScreen;
