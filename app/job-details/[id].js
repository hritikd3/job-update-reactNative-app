import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { COLORS, icons, image, SIZES } from "../../constants";
import {
  Stack,
  Tabs,
  useRoute,
  useRouter,
  useSea,
  useSearchParams,
} from "expo-router";
import { useCallback, useS, useState } from "react";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifies,
} from "../../components";

import useFetch from "../../hook/useFetch";

function JobDetails() {
  const params = useSearchParams();
  const router = useRouter();
const {data,isLoading, error , refetch}= useFetch('job-details',{
    job_id:params.id 
})
const [refreshing, setrefreshing] = useState(false);
const [activeTab, setActiveTab] = useState(false);

const onRefresh= ()=>{};

  return (
    <SafeAreaView style={{ flex: 3, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={Tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  ); 
}

export default JobDetails;