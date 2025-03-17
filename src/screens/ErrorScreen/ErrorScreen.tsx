import React from "react";
import { SafeAreaView, View } from "react-native";
import { styles } from "./ErrorScreenStyle";
import { CustomButton, CustomText } from "../../components";
import { t } from "i18next";
import { BrokenHeartLottieLottie, LogoIcon } from "../../../assets";
import LottieView from "lottie-react-native";
import RNRestart from "react-native-restart";

const ErrorScreen = () => {
  const handleSave = async () => {
    RNRestart.restart();
  };
  return (
    <SafeAreaView style={styles.root}>
      <LogoIcon style={styles.logo} />
      <View style={styles.container}>
        <LottieView
          source={BrokenHeartLottieLottie}
          autoPlay
          style={{ height: 90, width: 145 }}
        />
        <CustomText style={styles.title}>{t("errorPage.title")}</CustomText>
        <CustomText style={styles.subTitle}>
          {t("errorPage.subTitle")}
        </CustomText>
        <CustomButton
          text={t("errorPage.toMainPageButton")}
          style={styles.button}
          onPress={handleSave}
        />
      </View>
    </SafeAreaView>
  );
};

export default ErrorScreen;
