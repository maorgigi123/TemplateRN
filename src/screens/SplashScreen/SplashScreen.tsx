// ייבוא חבילות
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native"; // הייבוא של Lottie
import { GetSiteContentService } from "../../api/services/contentServices.ts"; // קריאת תוכן מאפיא
import { SITE_CONTENT_MUTATION_KEY } from "../../constants/keys"; // מפתח קריאת נתונים
import { addTexts } from "../../i18n"; // פונקציה להוספת טקסטים
import {
  BootParamList,
  BOOT,
  PREDEFINED,
  ERROR
} from "../../types/navigation"; // מסכים בו תבצע ניווט
import { styles } from "./SplashScreenStyle.ts"; // סגנונות
import { Text, TouchableOpacity, View } from "react-native";
import { getVersion } from "react-native-device-info";
import {SplashLottie} from "../../../assets/lottie";

const SplashScreen = () => {
  const [isContentLoaded, setContentLoaded] = useState(false); // מצב אם התוכן נטען
  const [isAnimationComplete, setAnimationComplete] = useState(false); // מצב אם האנימציה הושלמה
  const [isNavigated, setIsNavigated] = useState(false); // Track manual navigation
  const animationRef = useRef<LottieView>(null);

  const navigation = useNavigation<NativeStackNavigationProp<BootParamList>>(); // ניווט למסכים
  const contentQuery = useQuery({
    queryKey: [SITE_CONTENT_MUTATION_KEY], // המפתח לקריאה
    queryFn: GetSiteContentService, // פונקציה שמביאה את התוכן מהשרת
  });

  // עדכון מצב כאשר הקריאה ל-API הצליחה
  useEffect(() => {
    if (contentQuery.isSuccess) {
      addTexts(contentQuery.data.content); // הוספת טקסטים מהתוכן
      setContentLoaded(true); // עדכון שהטקסטים נטענו
    }
  }, [contentQuery.isSuccess]);

  // טיפול בשגיאות כאשר הקריאה ל-API נכשלה
  useEffect(() => {
    if (contentQuery.isError) {
      if (isAxiosError(contentQuery.error)) {
        console.log("contentQuery.error", contentQuery.error); // הדפסת שגיאה
        // navigation.navigate(ERROR); // ניתן לבצע ניווט למסך שגיאה
      }
    }
  }, [contentQuery.isError]);

  // כאשר התוכן ו-אנימציה הושלמו, עובר למסך הבא
  useEffect(() => {
    if (isContentLoaded && isAnimationComplete && !isNavigated ) {      
       navigation.replace(BOOT); // ניווט למסך ההתחברות

    }
  }, [isContentLoaded, isAnimationComplete, isNavigated, navigation]);

  useEffect(() => {
    if(isNavigated)
       navigation.navigate(PREDEFINED);
  },[isNavigated])


  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 4500);
  
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.root]}>      
      {/* אנימציה עם Lottie */}
      {SplashLottie && 
       <LottieView
       ref={animationRef}
       source={SplashLottie} // מסלול ל-Lottie JSON שלך
       autoPlay
       loop={false} // לא לחזור על האנימציה
       style={styles.lottieAnimation} // סגנון לאנימציה
       resizeMode="cover"
     />
     }
         
      
    <TouchableOpacity onPress={() => {
       if (animationRef.current) {
        animationRef.current.reset(); // איפוס האנימציה
      }
      setIsNavigated(true); // Mark as manually navigated
    }}>
                <Text style={styles.TextVersion}>{getVersion()}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
