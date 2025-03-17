import { SafeAreaView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import fonts from "/styles/fonts";
import { isRTL } from "/utils/i18nHelper";
import { useGetTheme, useTheme } from "hooks/useTheme";
import { CustomButton, CustomSwitch, CustomText, Loader } from "components";
import { useState } from "react";
import { Theme, theme } from "./store/user/user.types";
import { useDispatch } from "react-redux";
import { SetTheme } from "./store/user/user.action";
const LoginScreen = () => {
    const { t } = useTranslation();
    const themeColor = useTheme(); // Get current theme
    const themeToggle = useGetTheme();
    const dispatch = useDispatch();
  
    const [loading, setLoading] = useState(false); // State to control loader visibility
  
    const handleSwitchStatuses = () => {
        dispatch(SetTheme(themeToggle === theme.dark ? theme.light : theme.dark));
    };
  
    const handleShowLoad = () => {
        setLoading(true); // Show loader when the button is pressed
        setTimeout(() => {
            setLoading(false); // Hide loader after 5 seconds
        }, 5000);
    };

    return (
        <SafeAreaView
            style={{
                flexDirection: "column",
                alignItems: isRTL() ? "flex-end" : "flex-start",
                backgroundColor: themeColor.BACKGROUND,
                flex: 1,
                gap:25
            }}
        >
            <CustomText
                style={[
                    { fontFamily: fonts.type.demibold, fontSize: 40, color: themeColor.TEXT },
                ]}
            >
                {t("layout.header.goodMorning")}
            </CustomText>
            <CustomText
                style={[
                    { fontFamily: fonts.type.regular, fontSize: 30, color: themeColor.TEXT },
                ]}
            >
                {t("layout.header.welcome")}
            </CustomText>
            <CustomText
                style={[
                    { fontFamily: fonts.type.regular, fontSize: 30, color: themeColor.TEXT },
                ]}
            >
                {t("HomePage.title")}
            </CustomText>
            <View style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row-reverse',gap:15,marginHorizontal:10}}>
                    <CustomText
                        style={[
                            { fontFamily: fonts.type.regular, fontSize: 30, color: themeColor.TEXT },
                        ]}
                    >
                        {t("layout.header.theme")}
                    </CustomText>
                    <CustomSwitch
                        isSelected={themeToggle === theme.dark ? true : false}
                        setSelected={handleSwitchStatuses}
                        disabled={false}
                    />
            </View>
          

            <CustomButton
                style={{ backgroundColor: themeColor.PRIMARY_BUTTON }}
                text={t("showLoading")}
                onPress={handleShowLoad}
            />
            {loading && <Loader />}
        </SafeAreaView>
    )
}

