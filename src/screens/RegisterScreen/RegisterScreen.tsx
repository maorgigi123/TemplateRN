import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { RegisterService } from "../../api/services/authServices"; // Your registration service
import { AuthParamList, HOME, ERROR, LOGIN } from "../../types/navigation"; // Navigation screens
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";
import { styles } from "./RegisterScreenStyle"; // Import your styles
import { REGISTER_SERVICE_MUTATION_KEY } from "../../constants/keys"; // Your mutation key
import { emailRegex, usernameRegex, passwordRegex } from "../../utils/regex"; // Import regex

const RegisterScreen: React.FC = () => {
  const { t } = useTranslation();
  const colorTheme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AuthParamList>>();

  const [username, setUsername] = useState<string>(""); // Username state
  const [email, setEmail] = useState<string>(""); // Email state
  const [password, setPassword] = useState<string>(""); // Password state
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Confirm password state
  const [errorMessage, setErrorMessage] = useState<string>(""); // Error message state
  const [isNavigated, setIsNavigated] = useState<boolean>(false); // For navigation after registration

  const registerMutation = useMutation({
    mutationKey: [REGISTER_SERVICE_MUTATION_KEY],
    mutationFn: () => RegisterService(username, email, password), // Call RegisterService with username, email, password
    onSuccess: (data) => {
      console.log("Registration successful:", data?.message);
      setIsNavigated(true);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.error("Registration error:", error.response?.data);
        // Navigate to an error screen if needed
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
    setErrorMessage(""); // Clear error message if validation passes
    return true;
  };

  // Navigate after successful registration
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
      {/* Title */}
      <Text style={styles.title}>{t('register.title')}</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{t('register.subtitle')}</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder={t('register.usernamePlaceholder')}
        value={username}
        onChangeText={setUsername}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder={t('register.emailPlaceholder')}
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder={t('register.passwordPlaceholder')}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder={t('register.confirmPasswordPlaceholder')}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Error Message */}
      {errorMessage && <Text style={styles.errorText}>* {errorMessage}</Text>}

      {/* Register Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colorTheme.PRIMARY_BUTTON }]}
        onPress={() => {
          if (validateForm()) {
            registerMutation.mutate(); // Call register function if form is valid
          }
        }}
        disabled={registerMutation.isPending} // Disable if loading
      >
        {registerMutation.isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>{t('register.registerButton')}</Text>
        )}
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity onPress={() => navigation.navigate(LOGIN)}>
        <Text style={styles.loginLink}>{t('register.loginLink')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
