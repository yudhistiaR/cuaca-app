import { View, FlatList } from "react-native";
import { ThemedText } from "@/components/theme-text";
import { Image } from "expo-image";
import { toAmPm } from "@/utils/date";
import { Cuaca } from "@/types/cuaca";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface PrediksiCuacaProps {
  data?: Cuaca[];
}

export function PrediksiCuaca({ data }: PrediksiCuacaProps) {
  const theme = useColorScheme();
  const iconBgColor = theme === "light" ? "#F2F4F5" : "#212121";

  if (!data) return null;

  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        marginVertical: 45,
        justifyContent: "space-evenly",
        gap: 20,
      }}
      data={data}
      keyExtractor={(item, index) => item.datetime ? `${item.datetime}-${index}` : index.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              padding: 10,
              backgroundColor: iconBgColor,
              borderRadius: 50,
            }}
          >
            <Image
              contentFit="cover"
              style={{
                height: 25,
                width: 25,
              }}
              source={{ uri: item.image }}
            />
          </View>
          <ThemedText>{toAmPm(item.datetime)}</ThemedText>
          <ThemedText>{item.t}℃</ThemedText>
        </View>
      )}
    />
  );
}
