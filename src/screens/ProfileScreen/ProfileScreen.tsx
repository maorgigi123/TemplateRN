import React, { useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";
import fonts from "../../styles/fonts";
import { CustomButton, Loader } from "../../components"; // Assuming your CustomButton is styled nicely

const ProfileScreen = () => {
  const { t } = useTranslation();
  const themeColor = useTheme();

  // Placeholder profile image
  const [profileImage, setProfileImage] = useState("https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg");

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
      {/* Profile Header */}
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Image
          source={{ uri: profileImage }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 2,
            borderColor: themeColor.TEXT,
            marginBottom: 20,
          }}
        />
        <Text
          style={{
            fontFamily: fonts.type.demibold,
            fontSize: 24,
            color: themeColor.TEXT,
            marginBottom: 5,
          }}
        >
          {t("profile.username")}
        </Text>
        <Text
          style={{
            fontFamily: fonts.type.regular,
            fontSize: 16,
            color: themeColor.TEXT,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {t("profile.bio")}
        </Text>
      </View>

      {/* Action buttons */}
      <View style={{ width: "100%", alignItems: "center" }}>
        <CustomButton
          text={t("profile.editProfile")}
          onPress={() => {
            // Handle edit profile action
          }}
          style={{
            backgroundColor: themeColor.PRIMARY_BUTTON,
            marginBottom: 20,
            width: "100%",
            paddingVertical: 15,
          }}
        />
        <CustomButton
          text={t("profile.logout")}
          onPress={() => {
            // Handle logout action
          }}
          style={{
            backgroundColor: themeColor.PRIMARY_BUTTON_HOVER,
            width: "100%",
            paddingVertical: 15,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
