import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { LoginService } from "../../api/services/authServices"
import { HOME, ERROR, AuthParamList, REGISTER } from "../../types/navigation"; // Navigation screens
import { styles } from "./LoginScreenStyle.ts"; // Import styles
import { Login_SERIVCE_MUTATION_KEY } from "../../constants/keys.ts";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme.ts";
import { useDispatch } from "react-redux";
import { SetLogin } from "../../../store/user/user.action.ts";
import { IResponse } from "../../api/models/ResponseModels.ts";
import { useUserLocation } from "../../hooks/useUserLocation.ts";

const LoginScreen = () => {
  const [email, setEmail] = useState(""); // User email state
  const [password, setPassword] = useState(""); // User password state
  const [isNavigated, setIsNavigated] = useState(false); // Track manual navigation
  const [errorText, setErrorText] = useState<string>("")
  const navigation = useNavigation<NativeStackNavigationProp<AuthParamList>>(); // Navigation
  const colorTheme = useTheme();
  const { t } = useTranslation();
  const dispath = useDispatch()


  // API Call - useMutation for login request
  const loginMutation = useMutation({
    mutationKey: [Login_SERIVCE_MUTATION_KEY],
    mutationFn: () => LoginService(email, password), // Login function
    onSuccess: (data) => {
      console.log("Login successful:", data);
      dispath(SetLogin(true))
      setIsNavigated(true); // Mark navigation
    },
    onError: (error) => {
      if (isAxiosError<IResponse<any>>(error)) {
        console.log(error)
        setErrorText(error.response?.data?.messageDesc || "")
        // navigation.navigate(ERROR); // Navigate to error screen if needed
      }
    },
  });

  

  // Navigate when login is successful
  useEffect(() => {
    if (isNavigated) {
      console.log('login')
      // navigation.replace(BOTTOM_TABS); // Navigate to home screen
    }
  }, [isNavigated, navigation]);
  return (
    <View style={styles.root}>
      {/* Title */}
      <Text style={styles.title}>{t('login.title')}</Text>
      
      {/* Subtitle */}
      <Text style={styles.subtitle}>{t('login.subtitle')}</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder={t('login.emailPlaceholder')}
        placeholderTextColor={colorTheme.TEXT}
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder={t('login.passwordPlaceholder')}
        placeholderTextColor={colorTheme.TEXT}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorText.length > 0 &&
            <Text style={{color:"red",fontSize:16}}>
            * {errorText}
            </Text>
      }
      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button,{backgroundColor: colorTheme.PRIMARY_BUTTON}]}
        onPress={() => loginMutation.mutate()} // Call login function
        disabled={loginMutation.isPending} // Disable if loading
      >
        {loginMutation.isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>{t('login.loginButton')}</Text>
        )}
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => console.log('Forgot Password')}>
        <Text style={styles.forgotPassword}>{t('login.forgotPassword')}</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => navigation.navigate(REGISTER)}>
        <Text style={styles.signUpLink}>{t('login.signUpLink')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
