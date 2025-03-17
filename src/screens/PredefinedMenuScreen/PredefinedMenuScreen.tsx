import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextInput, TouchableOpacity, View } from "react-native";
import RNRestart from "react-native-restart";
import { queryClient } from "../../../App";
import {
  getIsServicePredefined,
  getPredefinedJSON,
} from "../../api/helpers/handlePredefined";
import { IResponse } from "../../api/models/ResponseModels";
import {
  CustomButton,
  CustomSwitch,
  CustomText,
  Loader,
} from "../../components/index";
import {
    GetSiteContentServiceResponse,
    LogOutServiceResponse,
    RegisterServiceResponse,
    listingServiceResponse,
    loginServiceResponse
} from "../../data";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { isAxiosError } from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackArrowIcon } from "../../../assets";
import {
  IS_PREDEFINED_STORAGE_KEY,
  PREDEFINED_RESPONSES_STORAGE_KEY,
  RESPONSES_PREDEFINED_QUERY_KEY,
  SERVICE_PREDEFINED_QUERY_KEY,
  STATUS_PREDEFINED_QUERY_KEY,
} from "../../constants/keys";
import { AuthParamList } from "../../types/navigation";
import {
  getItemFromStorage,
  removeItemFromStorage,
  setItemToStorage,
} from "../../utils/storage";
import { styles } from "./PredefinedMenuScreenStyle";

const SERVICES = new Map<string, IResponse<any>[]>([
  ["GetSiteContentService", GetSiteContentServiceResponse],
  ["RegisterService",RegisterServiceResponse],
  ["LoginService",loginServiceResponse],
  ["getListingsService", listingServiceResponse],
  ["LogOutService",LogOutServiceResponse]
]);

export const DEFAULT_PREDEFINED_DATA = Array.from(SERVICES.keys()).map(
  (key) => ({
    service: key,
    responseIndex: 0,
  })
);
const PredefinedMenuScreen = () => {
  const { t } = useTranslation();
  const [isPredefined, setIsPredefined] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<AuthParamList>>();

  const predefinedResponsesQuery = useQuery({
    queryKey: [STATUS_PREDEFINED_QUERY_KEY, RESPONSES_PREDEFINED_QUERY_KEY],
    queryFn: getPredefinedJSON,
  });
  useEffect(() => {
    if (predefinedResponsesQuery.isError) {
      if (isAxiosError(predefinedResponsesQuery.error)) {
        console.log(
          "predefinedResponsesQuery.error",
          predefinedResponsesQuery.error
        );
        // navigation.navigate(ERROR);
      }
    }
  }, [predefinedResponsesQuery.isError]);
  useEffect(() => {
    const data = predefinedResponsesQuery.data;
    if (data == null) {
      setData(DEFAULT_PREDEFINED_DATA);
    } else {
      setData(data);
    }
  }, [predefinedResponsesQuery.isSuccess]);

  const [data, setData] = useState<typeof DEFAULT_PREDEFINED_DATA | undefined>(
    undefined
  );
useEffect(() => {
  console.log("data" ,data)
},[data])
  const handleUpdateField = (index: number, service: string, value: number) => {
    setData((prev) => {
      if (prev == null) {
        return prev;
      }
      const newData = [...prev];
      newData[index] = { service, responseIndex: value };
      return newData;
    });
  };

  const handleSave = async () => {
    await setItemToStorage(
      PREDEFINED_RESPONSES_STORAGE_KEY,
      JSON.stringify(data)
    );
    RNRestart.restart();
  };

  const handleResetData = async () => {
    await removeItemFromStorage(PREDEFINED_RESPONSES_STORAGE_KEY);
    predefinedResponsesQuery.refetch();
    await Promise.all(
      DEFAULT_PREDEFINED_DATA.map(
        async (item) => await setPredefinedService(item.service, false)
      )
    );

    queryClient.invalidateQueries({ queryKey: [SERVICE_PREDEFINED_QUERY_KEY] });
  };

  const handleSwitchStatuses = async () => {
    const status = await getItemFromStorage(IS_PREDEFINED_STORAGE_KEY);
    setIsPredefined((prev) => !prev);
    if (status === "true") {
      handleResetData();
      await setItemToStorage(IS_PREDEFINED_STORAGE_KEY, "false");
    } else {
      await setItemToStorage(IS_PREDEFINED_STORAGE_KEY, "true");
      predefinedResponsesQuery.refetch();
      await Promise.all(
        DEFAULT_PREDEFINED_DATA.map(
          async (item) => await setPredefinedService(item.service, true)
        )
      );
      queryClient.invalidateQueries({
        queryKey: [SERVICE_PREDEFINED_QUERY_KEY],
      });
    }
  };

  const setPredefinedService = async (service: string, value: boolean) => {
    await setItemToStorage(service, value.toString());
  };

  useEffect(() => {
    async function init() {
      const status = await getItemFromStorage(IS_PREDEFINED_STORAGE_KEY);
      setIsPredefined(status === "true" ? true : false);
    }
    init();
  }, []);

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => RNRestart.restart()}>
          <CustomText style={{marginRight:10}}>Back</CustomText>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            width: "30%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
          }}
        >
          <CustomSwitch
            isSelected={!isPredefined}
            setSelected={handleSwitchStatuses}
            disabled={false}
          />
          <CustomText style={{marginLeft:10}}>{isPredefined ? "Predefined" : "Server"}</CustomText>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Services"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
          keyboardShouldPersistTaps={"handled"}
          nestedScrollEnabled
          style={styles.content}
        >
          {predefinedResponsesQuery.isLoading ? (
            <Loader size="small" />
          ) : (
            <View
              style={{
                gap: 10,
              }}
            >
              {data?.map((item, index) => {
                  console.log("Item:", item);
                return (
                  <View
                    key={index}
                    style={{
                      display: item.service
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                        ? "flex"
                        : "none",
                    }}
                  >
                    <Item
                      title={item.service}
                      value={item.responseIndex}
                      setValue={(value) =>
                        handleUpdateField(index, item.service, value)
                      }
                      setSpecificServiceValue={(value) =>
                        setPredefinedService(item.service, value)
                      }
                      responses={SERVICES.get(item.service) ?? []}
                    />
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>

        <View style={styles.container_btn}>
          <CustomButton
            style={styles.btn}
            text={t("continue")}
            onPress={handleSave}
          />
          <TouchableOpacity style={{ marginTop: 10 }} onPress={handleResetData}>
            <View>
              <CustomText>Reset Data</CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const Item = ({
  title,
  value,
  setValue,
  setSpecificServiceValue,
  responses,
  disabled = false,
}: {
  title: string;
  value: number;
  setValue: (index: number) => any;
  setSpecificServiceValue: (value: boolean) => any;
  responses: object[];
  disabled?: boolean;
}) => {
  const [isExpanded, setExpanded] = useState(false);

  const specificServiceValue = useQuery({
    queryKey: [SERVICE_PREDEFINED_QUERY_KEY, title],
    queryFn: async () => getIsServicePredefined(title),
  });
  return (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <CustomText style={styles.itemTitle}>{title}</CustomText>
        <View style={styles.container_collapse}>
          <CustomText style={styles.itemIndex}>{value}</CustomText>
          <CustomSwitch
            isSelected={disabled ? false : !specificServiceValue.data}
            setSelected={(bool) => {
              setSpecificServiceValue(!bool);
              specificServiceValue.refetch();
            }}
            disabled={disabled}
          />
          <TouchableOpacity
            style={{ height: 20, width: 20, paddingLeft: 2 }}
            onPress={() => setExpanded((prev) => !prev)}
          >
            <BackArrowIcon
              style={{
                transform: [{ rotateZ: isExpanded ? "-90deg" : "90deg" }],
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isExpanded && (
        <View>
          {responses.map((_, index) => (
            <TouchableOpacity
              onPress={() => setValue(index)}
              key={index}
              style={[
                styles.container_expanded,
                {
                  backgroundColor:
                    index === value ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.2)",
                },
              ]}
            >
              <CustomText style={styles.text_data}>{index}</CustomText>
              <CustomText style={styles.jsonText} numberOfLines={20}>
                {JSON.stringify(responses[index], null, 2)}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
export default PredefinedMenuScreen;
