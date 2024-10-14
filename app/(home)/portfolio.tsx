import CryptoItem from "@/components/CryptoItem";
import { CryptoModel } from "@/model/CryptoModel";
import { getCryptoPrices } from "@/services/api";
import { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";

const PortfolioScreen = () => {
  const [cryptoData, setCryptoData] = useState<CryptoModel[]>([]);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    const data = await getCryptoPrices();
    setCryptoData(data);
  };

  return (
    <View
    // className="flex-1 p-4 bg-white"
    >
      <Text
      // className="text-2xl font-bold text-gray-800 mb-4"
      >
        Portfolio
      </Text>

      <FlatList
        data={cryptoData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CryptoItem crypto={item} />}
      />
    </View>
  );
};
