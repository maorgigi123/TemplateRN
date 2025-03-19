import React, { useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";
import fonts from "../../styles/fonts";
import { CustomButton, Loader } from "../../components"; // Assuming your CustomButton is styled nicely
import { useMutation } from "@tanstack/react-query";
import { LogOutService } from "../../api/services/authServices";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../types/navigation";
import { isAxiosError } from "axios";
import { IResponse } from "api/models/ResponseModels";
import { useDispatch } from "react-redux";
import { SetLogin } from "../../../store/user/user.action";
import logger from "../../utils/logger";
import ExploreScreen from "../../screens/ExploreScreen";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const themeColor = useTheme();
  const dispath = useDispatch();
  // Placeholder profile image
  const [profileImage, setProfileImage] = useState("https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg");
  
    // Mutation for logout
    const logoutMutation = useMutation({
      mutationFn: LogOutService,
      onSuccess: (data) => {
        // Handle successful logout
        dispath(SetLogin(false))
        logger('user successful logout')
      },
    onError: (error) => {
          if (isAxiosError<IResponse<any>>(error)) {
            console.log(error.response)
            // navigation.navigate(ERROR); // Navigate to error screen if needed
          }
        },
    });

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
            // Handle ç action
            logoutMutation.mutate()
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
