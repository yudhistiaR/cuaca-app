import WeatherCard from "@/components/cuaca-card";
import { DetailCuaca } from "@/components/detail-cuaca";
import { PrediksiCuaca } from "@/components/prediksi-cuaca";
import { ListPerkiraan } from "@/components/list-perkiraan";
import { ThemedScrollView } from "@/components/theme-scroll-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Data, ResponseData } from "@/types/cuaca";
import { useEffect, useState } from "react";
import { RefreshControl } from "react-native";

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
      <ListPerkiraan data={data[0]?.cuaca[2]} />
    </ThemedScrollView>
  );
}
