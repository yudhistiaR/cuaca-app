import { Data } from "@/types/cuaca";
import { formatWeatherTime } from "@/utils/date";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { ThemedText } from "./theme-text";

interface WeatherCardProps {
  data: Data[];
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <View>
      {data?.map((item, i) => (
        <View
          key={item.lokasi.type + i}
          style={{
            paddingVertical: 20,
            paddingHorizontal: 16,
            height: 500,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "black",
            backgroundColor: item.cuaca[0][0].t >= 30 ? "#FFC224" : "#295FB5",
            marginBottom: 20,
          }}
        >
          <View>
            <ThemedText style={{ color: "#fff" }} type="subtitle">
              <MaterialIcons name="location-pin" size={16} />
              {item.lokasi.kecamatan ?? "N/A"}, {item.lokasi.desa ?? "N/A"}
            </ThemedText>
            <ThemedText style={{ color: "#fff" }} type="default">
              {formatWeatherTime(item.cuaca[0][0].datetime) ?? "N/A"}
            </ThemedText>
          </View>
          <Image
            contentFit="cover"
            style={{
              width: 200,
              height: 200,
              marginVertical: 20,
            }}
            source={{
              uri: item.cuaca[0][0].image,
            }}
          />
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fff", fontSize: 54, fontWeight: "bold" }}>
              {item.cuaca[0][0].t ?? "N/A"}℃
            </Text>
            <ThemedText style={{ color: "#fff" }} type="title">
              {item.cuaca[0][0].weather_desc ?? "N/A"}
            </ThemedText>
            <ThemedText
              style={{
                color: "#fff",
                alignItems: "center",
                alignContent: "center",
              }}
              type="defaultSemiBold"
            >
              Angin {item.cuaca[0][0].ws ?? "N/A"} km/jam
            </ThemedText>
          </View>
        </View>
      ))}
    </View>
  );
};

export default WeatherCard;
