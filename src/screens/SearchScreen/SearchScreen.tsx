import React, { useEffect, useState, useCallback, useRef } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity, ActivityIndicator, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";
import fonts from "../../styles/fonts";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Listing_pages_MUTATION_KEY } from "../../constants/keys";
import { getListingsService } from "../../api/services/authServices";
import { useQueryClient } from "@tanstack/react-query";
import { IResponse } from "api/models/ResponseModels";
import { ExploreScreen, ListingCard, ListingCardSkeleton } from "../../screens"; // Assuming ListingCardSkeleton is the skeleton loader
import { IListing } from "../../types/response";
import { useUserLocation } from "../../hooks/useUserLocation";
import { selectLocation } from "../../../store/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { SetLocation as setCurrentLocation } from "../../../store/user/user.action";
import { TabsHeight } from "../../utils/helper";

const SearchScreen: React.FC = () => {
  const queryClient = useQueryClient();
  const themeColor = useTheme();
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [listings, setListings] = useState<IListing[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);  // Track fetching state
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true); // Track first load

  const flatListRef = useRef<FlatList>(null); // Reference to FlatList
  const [category,setCategory] = useState("Trending");
  const ProtectedRoute = useQuery({
    queryKey: [Listing_pages_MUTATION_KEY, page,category],
    queryFn: () => getListingsService(page, 10),
    retry: false,  // Disable retry for better control
  });

  const location = useSelector(selectLocation);
  const dispatch = useDispatch();
  const { location: newLocation, error } = useUserLocation();

  useEffect(() => {
    if (location.latitude == null || location.longitude == null) {
      if (newLocation) {
        dispatch(setCurrentLocation(newLocation));
      }
    }
  }, [location, newLocation, dispatch]);

  useEffect(() => {
    if (ProtectedRoute.isFetching) {
      setIsFetching(true);
    } else {
      setIsFetching(false);

      if (ProtectedRoute.isSuccess) {
        const newListings = ProtectedRoute.data?.data?.listings as IListing[];
        setHasMore(newListings.length === 10); // Check if more data is available
        setListings((prev) => [...prev, ...newListings]);
        setIsFirstLoad(false); // Set first load to false after initial data fetch
      }

      if (ProtectedRoute.isError) {
        if (isAxiosError<IResponse<any>>(ProtectedRoute.error)) {
          console.error("Error fetching listings:", ProtectedRoute.error);
        }
      }
    }
  }, [ProtectedRoute.isFetching, ProtectedRoute.isSuccess, ProtectedRoute.isError, ProtectedRoute.data]);

  const loadMoreListings = useCallback(() => {
    if (isFetching || !hasMore) return;  // Prevent loading more if still fetching or no more data
    setPage((prev) => prev + 1);  // Increment page number
  }, [isFetching, hasMore]);

  const handleRefetch = async () => {
    queryClient.removeQueries({ queryKey: [Listing_pages_MUTATION_KEY] });
    setListings([]);
    setHasMore(true);
    setPage(1);
    setIsFetching(true);  // Start a new fetch process
    ProtectedRoute.refetch();
  };

  const onCategoryChanged = (_category : string) => {
    if(category !== _category){
      console.log(' category ',_category)
      setListings([]);
      setIsFirstLoad(true)
      setHasMore(true);
      setPage(1);
      setIsFetching(true);  // Start a new fetch process
      setCategory(_category)
    }else{
      console.log('try reload current category')
    }
    // ProtectedRoute.refetch();
  }

  return (
    <View style={{flex:1,backgroundColor: themeColor.BACKGROUND}}>
 <SafeAreaView
    style={{
      paddingHorizontal: 20,
      paddingVertical: 30,
      marginBottom:TabsHeight
    }}
  >
      <View style={{ height: 130 }}>  
      <ExploreScreen onCategoryChanged={onCategoryChanged} />
    </View>
      {/* FlatList for displaying listings */}
      <FlatList
        ref={flatListRef} // Attach ref to FlatList
        data={listings}
        keyExtractor={(item) => `${item.id}-${item.category}`}
        renderItem={({ item }) => (
          <ListingCard item={item} themeColor={themeColor} fonts={fonts} location={location} />
        )}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: listings.length === 0 ? "center" : "flex-start", // Center only when empty
          alignItems: "center",
          marginTop:10
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreListings}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          !isFirstLoad && isFetching  ? (
            <ActivityIndicator size="large" color={themeColor.PRIMARY_BUTTON} />
          ) : hasMore && !isFirstLoad ? (
            <Text>No more listings</Text>
          ) : null
        }
        ListEmptyComponent={() =>
          !isFetching && listings.length === 0 && !isFirstLoad ? (
            <Text>{t("No listings found")}</Text>
          ) : null
        }
        onScrollToIndexFailed={() => {}} // Prevent errors if trying to scroll to an index that doesn't exist yet
      />

      {/* Skeleton loader during first load */}
      {isFirstLoad && (
        <FlatList
          data={new Array(10).fill(0)} // Skeleton loaders while data is fetching
          keyExtractor={(item, index) => index.toString()} // Use index to generate unique keys
          renderItem={() => <ListingCardSkeleton />}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: listings.length === 0 ? "center" : "flex-start", // Center only when empty
            alignItems: "center",
            marginTop:10
          }}
        />
      )}

      {/* Success message after listings are fetched */}
      {ProtectedRoute.isSuccess && !hasMore  && !isFirstLoad && (
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
    </View>
  );
};

export default SearchScreen;
