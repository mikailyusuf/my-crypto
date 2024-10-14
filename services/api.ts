// services/api.ts

import { CryptoModel } from "../model/CryptoModel";
import { CryptoDetailsModel } from "../model/CryptoDetailsModel";

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

export const getCryptoDetails = async (
  id: string
): Promise<CryptoDetailsModel> => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    symbol: data.symbol,
    description: data.description.en,
    url: data.links.homepage[0],
    current_price: data.current_price,
    image: data.image.large,
  };
};

export const getCryptoChartData = async (
  id: string
): Promise<CryptoGraphData> => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14`
  );
  const data = await response.json();

  const labels = data.prices.map((item: [number, number]) => {
    const date = new Date(item[0]);
    return date.toLocaleDateString();
  });

  const dataSetData = data.prices.map((item: [number, number]) => item[1]);

  console.log(`labels == ${labels}`)
  return {
    labels,
    datasets: [
      {
        label: "Price",
        data: dataSetData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };
};
