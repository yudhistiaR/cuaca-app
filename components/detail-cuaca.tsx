import { View, FlatList } from "react-native";
import { ThemedText } from "@/components/theme-text";
import { ThemedView } from "@/components/theme-view";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Data } from "@/types/cuaca";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface DetailCuacaProps {
  data: Data[];
}

export function DetailCuaca({ data }: DetailCuacaProps) {
  const theme = useColorScheme();
  const iconBgColor = theme === "light" ? "#F2F4F5" : "#212121";
  const iconColor = theme === "light" ? "black" : "white";

  return (
    <ThemedView style={{ marginVertical: 20 }}>
      <ThemedText type="subtitle">Cuaca</ThemedText>
      <FlatList
        contentContainerStyle={{
          marginTop: 20,
        }}
        data={data}
        horizontal={false}
        keyExtractor={(item, index) => item.cuaca?.[0]?.[0]?.datetime ? `${item.cuaca[0][0].datetime}-${index}` : index.toString()}
        renderItem={({ item }) => {
          const cuacaDetail = item.cuaca?.[0]?.[0];
          if (!cuacaDetail) return null;

          return (
            <ThemedView>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ gap: 8 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: iconBgColor,
                        borderRadius: 50,
                      }}
                    >
                      <MaterialIcons name="umbrella" size={30} color={iconColor} />
                    </View>
                    <ThemedView>
                      <ThemedText>Kelembapan</ThemedText>
                      <ThemedText>{cuacaDetail.hu}</ThemedText>
                    </ThemedView>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: iconBgColor,
                        borderRadius: 50,
                      }}
                    >
                      <MaterialIcons name="air" size={30} color={iconColor} />
                    </View>
                    <ThemedView>
                      <ThemedText>Kecepatan Angin</ThemedText>
                      <ThemedText>{cuacaDetail.ws} km/jam</ThemedText>
                    </ThemedView>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: iconBgColor,
                        borderRadius: 50,
                      }}
                    >
                      <MaterialIcons name="compass-calibration" size={30} color={iconColor} />
                    </View>
                    <ThemedView>
                      <ThemedText>Arah Angin</ThemedText>
                      <ThemedText>{cuacaDetail.wd}</ThemedText>
                    </ThemedView>
                  </View>
                </View>
                {/* Row 2 */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: iconBgColor,
                      borderRadius: 50,
                    }}
                  >
                    <MaterialIcons name="visibility" size={30} color={iconColor} />
                  </View>
                  <ThemedView>
                    <ThemedText>Jarak Pandang</ThemedText>
                    <ThemedText>{cuacaDetail.vs_text}</ThemedText>
                  </ThemedView>
                </View>
              </View>
            </ThemedView>
          );
        }}
      />
    </ThemedView>
  );
}
