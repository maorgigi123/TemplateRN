import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { RegisterService } from "../../api/services/authServices";
import { AuthParamList, HOME, ERROR, LOGIN } from "../../types/navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";
import { styles } from "./RegisterScreenStyle";
import { REGISTER_SERVICE_MUTATION_KEY } from "../../constants/keys";
import { emailRegex, usernameRegex, passwordRegex } from "../../utils/regex";
import { IResponse } from "api/models/ResponseModels";

const RegisterScreen: React.FC = () => {
  const { t } = useTranslation();
  const colorTheme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthParamList>>();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isNavigated, setIsNavigated] = useState<boolean>(false);

  const registerMutation = useMutation({
    mutationKey: [REGISTER_SERVICE_MUTATION_KEY],
    mutationFn: () => RegisterService(username, email, password, phone, location),
    onSuccess: (response) => {
      setIsNavigated(true);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error.response?.data)
        setErrorMessage(error.response?.data?.messageDesc)
      }
    },
  });

  const validateForm = () => {
    if (!usernameRegex.test(username)) {
      setErrorMessage("Username cannot contain spaces.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage("Password must be between 6 and 10 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords must match.");
      return false;
    }
    if (!phone) {
      setErrorMessage("Phone number is required.");
      return false;
    }
    if (!location) {
      setErrorMessage("Location is required.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  useEffect(() => {
    if (isNavigated) {
      navigation.reset({
        index: 0,
        routes: [{ name: LOGIN }],
      });
    }
  }, [isNavigated, navigation]);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{t('register.title')}</Text>
      <Text style={styles.subtitle}>{t('register.subtitle')}</Text>
      
      <TextInput style={styles.input} placeholder={t('register.usernamePlaceholder')} value={username} onChangeText={setUsername}   autoCapitalize="none" placeholderTextColor={colorTheme.TEXT}/>
      <TextInput style={styles.input} placeholder={t('register.emailPlaceholder')} value={email} onChangeText={setEmail} autoCapitalize="none" placeholderTextColor={colorTheme.TEXT} />
      <TextInput style={styles.input} placeholder={t('register.passwordPlaceholder')} secureTextEntry value={password} onChangeText={setPassword} autoCapitalize="none" placeholderTextColor={colorTheme.TEXT}/>
      <TextInput style={styles.input} placeholder={t('register.confirmPasswordPlaceholder')} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} autoCapitalize="none" placeholderTextColor={colorTheme.TEXT}/>
      <TextInput style={styles.input} placeholder={t('register.phonePlaceholder')} value={phone} onChangeText={setPhone} autoCapitalize="none" placeholderTextColor={colorTheme.TEXT} />
      <TextInput style={styles.input} placeholder={t('register.locationPlaceholder')} value={location} onChangeText={setLocation} autoCapitalize="none" placeholderTextColor={colorTheme.TEXT}/>
      
      {errorMessage && <Text style={styles.errorText}>* {errorMessage}</Text>}
      
      <TouchableOpacity style={[styles.button, { backgroundColor: colorTheme.PRIMARY_BUTTON }]} onPress={() => { if (validateForm()) { registerMutation.mutate(); } }} disabled={registerMutation.isPending}>
        {registerMutation.isPending ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>{t('register.registerButton')}</Text>}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate(LOGIN)}>
        <Text style={styles.loginLink}>{t('register.loginLink')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
