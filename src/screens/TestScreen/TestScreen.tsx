import {
  ENVIRONMENT,
  BASE_URL,
} from "@env";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { CloseInfoIcon } from "../../../assets";
import { CustomText } from "../../components";
import { styles } from "./TestScreenStyle";
import BottomSheet from "@gorhom/bottom-sheet";

const TestScreen = ({
  sheetRef,
}: {
  sheetRef: React.RefObject<BottomSheet | null>;
}) => {
  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity onPress={() => sheetRef.current?.close()}>
        <CloseInfoIcon width={14} height={14} />
      </TouchableOpacity>
      <View style={styles.loggerContainer}>
        <ScrollView>
          <CustomText
            style={styles.topText}
          >{`BASE_URL : ${BASE_URL}`}</CustomText>
          <CustomText
            style={styles.topText}
          >{`ENVIRONMENT : ${ENVIRONMENT}`}</CustomText>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;
