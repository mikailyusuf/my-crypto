import CryptoItem from "@/components/CryptoItem";
import { CryptoModel } from "@/model/CryptoModel";
import { getCryptoPrices } from "@/services/api";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Progress from "react-native-progress";
import { isLoading } from "expo-font";

const IndexPage = () => {
  const [cryptoData, setCryptoData] = useState<CryptoModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotateIcon = () => {
    rotateAnim.setValue(0);

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000, 
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  
  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    setLoading(true);
    const data = await getCryptoPrices();
    setLoading(false);
    setCryptoData(data);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCryptoData();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Text>
            Portfolio
          </Text>

          <Animated.View style={{ transform: [{ rotate }] }}>
          <Icon
            name="refresh"
            size={24}
            color="black"
            onPress={() => {
              fetchCryptoData();
              rotateIcon();
            }}
          />
      </Animated.View>
        </View>

        {loading && <ActivityIndicator />}

        <FlatList
          data={cryptoData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CryptoItem crypto={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default IndexPage;
