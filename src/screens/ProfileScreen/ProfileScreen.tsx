import React, { useState } from "react";
import { SafeAreaView, Text, View, Image, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useGetTheme, useTheme } from "../../hooks/useTheme";
import { CustomButton } from "../../components"; 
import { useMutation } from "@tanstack/react-query";
import { LogOutService } from "../../api/services/authServices";
import { isAxiosError } from "axios";
import { IResponse } from "api/models/ResponseModels";
import { useDispatch } from "react-redux";
import { SetLogin, SetTheme } from "../../../store/user/user.action";
import logger from "../../utils/logger";
import { theme } from "../../../store/user/user.types";
import fonts from "../../styles/fonts";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const themeColor = useTheme();
  const dispatch = useDispatch();

  const [profileImage] = useState(
    "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg"
  );

  const Curtheme = useGetTheme();

  const logoutMutation = useMutation({
    mutationFn: LogOutService,
    onSuccess: () => {
      dispatch(SetLogin(false));
      logger("User successfully logged out");
    },
    onError: (error) => {
      if (isAxiosError<IResponse<any>>(error)) {
        console.log(error.response);
      }
    },
  });

  const handleSetOtherTheme = () => {
    dispatch(SetTheme(Curtheme === theme.dark ? theme.light : theme.dark));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeColor.BACKGROUND,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 30,
      }}
    >
      <ScrollView>
        {/* Profile Header */}
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Image
            source={{ uri: profileImage }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 2,
              borderColor: themeColor.SECONDARY_TEXT,
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

        {/* Description Section */}
        <View
          style={{
            paddingHorizontal: 20,
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: themeColor.SECONDARY_TEXT,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {t("profile.description")}
          </Text>
        </View>

        {/* Stats / Info Section */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 20,
          }}
        >
          {[1, 2, 3].map((_, index) => (
            <View key={index} style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: themeColor.PRIMARY_BUTTON,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {t(`profile.stat${index + 1}.title`)}
              </Text>
              <Text
                style={{
                  color: themeColor.SECONDARY_TEXT,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                {t(`profile.stat${index + 1}.value`)}
              </Text>
            </View>
          ))}
        </View>

        {/* Action buttons */}
        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 20,
            marginTop:40,
            paddingHorizontal: 20,
          }}
        >
          <CustomButton
            text={t("profile.editProfile")}
            onPress={() => {
              // Handle edit profile action
            }}
            style={{
              backgroundColor: themeColor.PRIMARY_BUTTON,
              width: "100%",
              paddingVertical: 15,
            }}
          />
          <CustomButton
            text={t("profile.logout")}
            onPress={() => {
              logoutMutation.mutate();
            }}
            style={{
              backgroundColor: themeColor.PRIMARY_BUTTON_HOVER,
              width: "100%",
              paddingVertical: 15,
            }}
          />
          <CustomButton
            text={t("profile.changeTheme")}
            onPress={() => {
              handleSetOtherTheme();
            }}
            style={{
              backgroundColor: themeColor.PRIMARY_BUTTON_HOVER,
              width: "100%",
              paddingVertical: 15,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
