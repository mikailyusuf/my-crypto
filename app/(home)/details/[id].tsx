import React, { useEffect, useState } from "react";
import { Text, View, Image, useWindowDimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CryptoDetailsModel } from "@/model/CryptoDetailsModel";
import { getCryptoChartData, getCryptoDetails } from "@/services/api";
import RenderHtml from "react-native-render-html";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";

const DetailsScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<CryptoDetailsModel>();
  const [graphData, setGraphData] = useState<CryptoGraphData>();
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const stringId = id as string;
    const data = await getCryptoDetails(stringId);
    setData(data);
    setLoading(false);
    const graphData = await getCryptoChartData(stringId);
    setGraphData(graphData);
  };

  const source = {
    html: data?.description,
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-red p-4">
          {loading && <ActivityIndicator />}
          <Icon
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Image
            source={{ uri: data?.image }}
            style={{ width: width, height: 220, objectFit: "cover" }}
          />
          <Text className="text-lg font-mono text-black">{data?.name}</Text>
          <RenderHtml contentWidth={width} source={source} />
          {graphData ? (
            <LineChart
              data={graphData}
              width={width}
              height={220}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
