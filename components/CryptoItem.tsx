// components/CryptoItem.tsx

import React from "react";
import { View, Text, Image } from "react-native";
import { CryptoModel } from "../model/CryptoModel";

interface CryptoItemProps {
  crypto: CryptoModel;
}

const CryptoItem: React.FC<CryptoItemProps> = ({ crypto }) => {
  return (
    <View className="flex-row justify-between items-center py-2 px-4 bg-white rounded-lg shadow-md mb-2">
      {/* Image of the cryptocurrency */}
      <Image
        source={{ uri: crypto.image }}
        style={{ width: 40, height: 40 }}
        className="mr-4"
      />

      {/* Crypto Details */}
      <View className="flex-1">
        <Text className="text-lg font-bold">
          {crypto.name} ({crypto.symbol.toUpperCase()})
        </Text>
        <Text className="text-sm text-gray-700">
          ${crypto.current_price.toFixed(2)}
        </Text>
      </View>

      {/* Price Change */}
      <View className="items-end">
        <Text
          className={`text-sm ${
            crypto.price_change_percentage_24h >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

export default CryptoItem;
