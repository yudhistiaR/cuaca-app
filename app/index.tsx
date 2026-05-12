import WeatherCard from "@/components/cuaca-card";
import { DetailCuaca } from "@/components/detail-cuaca";
import { PrediksiCuaca } from "@/components/prediksi-cuaca";
import { ThemedScrollView } from "@/components/theme-scroll-view";
import { ThemedText } from "@/components/theme-text";
import { ThemedView } from "@/components/theme-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Data, ResponseData } from "@/types/cuaca";
import { simpleDate } from "@/utils/date";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

export default function Index() {
  const [data, setData] = useState<Data[]>([]);
  const [_isLoading, setIsloading] = useState<boolean>(false);
  const [_errorMsg, setErrorMsg] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);

  const theme = useColorScheme();

  const onRefresh = async () => {
    setRefreshing(true);
    await getCuaca();
    setRefreshing(false);
  };

  const getCuaca = async () => {
    setIsloading(true);

    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BMKN_API_URL}?adm4=63.71.01.1001`,
      );

      if (!res.ok) {
        throw new Error("Gagal mengambil data");
      }

      const { data } = (await res.json()) as ResponseData;

      setData(data);
    } catch (error: any) {
      setErrorMsg(error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getCuaca();
    const interval = setInterval(
      () => {
        getCuaca();
      },
      15 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemedScrollView
      style={{
        flex: 1,
        paddingHorizontal: 16,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <WeatherCard data={data} />
      <PrediksiCuaca data={data[0]?.cuaca[1]} />
      <DetailCuaca data={data} />
      <ThemedView>
        <ThemedText type="subtitle">Perkiraan Cuaca</ThemedText>
      </ThemedView>
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 5,
          marginTop: 10,
          marginBottom: 40,
        }}
        data={data[0]?.cuaca[2]}
        keyExtractor={(item) => item.datetime + 1}
        renderItem={({ item }) => (
          <ThemedView
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 20,
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: theme === "light" ? "#F2F4F5" : "#212121",
            }}
          >
            <ThemedText>{simpleDate(item.datetime)}</ThemedText>
            <ThemedText>{item.t}℃</ThemedText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ThemedText>{item.weather_desc}</ThemedText>
              <Image
                contentFit="cover"
                style={{ width: 20, height: 20 }}
                source={{ uri: item.image }}
              />
            </View>
          </ThemedView>
        )}
      />
    </ThemedScrollView>
  );
}
