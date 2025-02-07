import axios from "axios";
import { CryptoData } from "../types/cryptoTypes";

const BASE_URL = "https://api.binance.com/api/v3/ticker/24hr";

export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await axios.get<CryptoData[]>(BASE_URL);
    const usdtPairs = response.data.filter((coin: any) =>
      coin.symbol.endsWith("USDT")
    );
    return usdtPairs;
  } catch (error) {
    console.error("Error fetching data from Binance API:", error);
    return [];
  }
};
