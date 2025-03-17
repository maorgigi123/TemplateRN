import React, { useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";
import fonts from "../../styles/fonts";
import { CustomButton, Loader } from "../../components"; // Assuming your CustomButton is styled nicely

const RentalScreen = () => {
  const themeColor = useTheme()
const {t} = useTranslation()
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
        rental
      </Text>
     
    </SafeAreaView>
  );
};

export default RentalScreen;
