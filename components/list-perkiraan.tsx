import { View } from "react-native";
import { ThemedText } from "@/components/theme-text";
import { ThemedView } from "@/components/theme-view";
import { Image } from "expo-image";
import { simpleDate } from "@/utils/date";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Cuaca } from "@/types/cuaca";

interface ListPerkiraanProps {
  data?: Cuaca[];
}

export function ListPerkiraan({ data }: ListPerkiraanProps) {
  const theme = useColorScheme();
  
  if (!data) return null;

  return (
    <View>
      <ThemedView>
        <ThemedText type="subtitle">Perkiraan Cuaca</ThemedText>
      </ThemedView>
      <View
        style={{
          gap: 5,
          marginTop: 10,
          marginBottom: 40,
        }}
      >
        {data.map((item, index) => {
          const itemKey = item.datetime ? `${item.datetime}-${index}` : index.toString();
          
          return (
            <ThemedView
              key={itemKey}
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
          );
        })}
      </View>
    </View>
  );
}
