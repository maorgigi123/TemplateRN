import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";
import fonts from "../../styles/fonts";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Listing_pages_MUTATION_KEY } from "../../constants/keys";
import { getListingsService } from "../../api/services/authServices";
import { useQueryClient } from "@tanstack/react-query";
import { IResponse } from "api/models/ResponseModels";
import { SCREEN_WIDTH } from "../../utils/details";
import {ListingCard} from "../../screens";
import { IListing } from "../../types/response";

const SearchScreen: React.FC = () => {
  const queryClient = useQueryClient();
  const themeColor = useTheme();
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [listings, setListings] = useState<IListing[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const ProtectedRoute = useQuery({
    queryKey: [Listing_pages_MUTATION_KEY, page],
    queryFn: () => getListingsService(page, 10),
  });

  useEffect(() => {
    if (ProtectedRoute.isSuccess) {
      const newListings = ProtectedRoute.data?.data?.listings as IListing[];
      if(newListings && newListings.length > 0)
        setListings((prev) => [...prev, ...newListings]);
      if (newListings.length < 10) setHasMore(false);
    }
  }, [ProtectedRoute.isSuccess, ProtectedRoute.data]);

  useEffect(() => {
    if (ProtectedRoute.isError) {
      if (isAxiosError<IResponse<any>>(ProtectedRoute.error)) {
        console.error("Error fetching listings:", ProtectedRoute.error);
      }
    }
  }, [ProtectedRoute.isError, ProtectedRoute.error]);

  const loadMoreListings = useCallback(() => {
    if (ProtectedRoute.isFetching || !hasMore) return;
    setPage((prev) => prev + 1);
  }, [ProtectedRoute.isFetching, hasMore]);

  const handleRefetch = async () => {
    queryClient.removeQueries({ queryKey: [Listing_pages_MUTATION_KEY] });
    setListings([]);
    setHasMore(true);
    setPage(1);
    ProtectedRoute.refetch();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeColor.BACKGROUND,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 30,
      }}
    >

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListingCard item={item} themeColor={themeColor} fonts={fonts} />
        )}
        onEndReached={loadMoreListings}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          ProtectedRoute.isFetching ? (
            <ActivityIndicator size="large" color={themeColor.PRIMARY_BUTTON} />
          ) : null
        }
      />

      {ProtectedRoute.isSuccess && (
        <Text
          style={{
            fontFamily: fonts.type.demibold,
            fontSize: 18,
            color: themeColor.TEXT,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {t("Successfully fetched listings")}
        </Text>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
