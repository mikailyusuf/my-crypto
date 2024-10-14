// services/api.ts

import { CryptoModel } from "../model/CryptoModel";

export const getCryptoPrices = async (): Promise<CryptoModel[]> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  );
  const data = await response.json();

  return data.map(
    (coin: any): CryptoModel => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      image: coin.image,
      price_change_percentage_24h: coin.price_change_percentage_24h,
    })
  );
};
