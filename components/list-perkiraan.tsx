import { Cuaca } from "@/types/cuaca";
import { FlatList, Image, Text, View } from "react-native";
import { ThemedView } from "./theme-view";

interface PredictionListProps {
  data: Cuaca[];
  loading: boolean;
}

const PredictionList = ({ data, loading }: PredictionListProps) => {
  return (
    <ThemedView
      style={{
        flex: 1,
        borderRadius: 30,
        height: 100,
        flexDirection: "row",
      }}
    >
      <Text>Kontol</Text>
      {loading && (
        <FlatList
          data={data}
          keyExtractor={(item, i) => item.datetime + i}
          renderItem={({ item }) => (
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 30,
                flexDirection: "row",
              }}
            >
              <Image
                height={200}
                width={100}
                resizeMode="cover"
                source={{
                  uri: item.image,
                }}
              />
              <Text>{item.datetime ?? "N/A"}</Text>
            </View>
          )}
        />
      )}
    </ThemedView>
  );
};

export default PredictionList;
