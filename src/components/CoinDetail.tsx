import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WebSocketData } from "../types/cryptoTypes";

const CoinDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [coinData, setCoinData] = useState<WebSocketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState<string | null>(null);
  const [changePercent, setChangePercent] = useState<string | null>(null);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!symbol) return;
    const lowersymbol = symbol.toLowerCase();
    const wsUrl = `wss://stream.binance.com:9443/ws/${lowersymbol}@ticker`;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setLoading(false);
    };

    ws.current.onmessage = (event) => {
      const data: WebSocketData = JSON.parse(event.data);
      setCoinData(data);
      setPrice(parseFloat(data.c).toFixed(3));
      setChangePercent(parseFloat(data.P).toFixed(2));
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [symbol]);

  const formattedSymbol = symbol?.replace("USDT", "").toUpperCase();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
      </div>
    );

  if (!coinData)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-red-500 text-center text-lg">
          No data available
        </div>
      </div>
    );

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-white mb-4">
          {formattedSymbol} Live Price
        </h1>

        <p className="text-lg text-gray-300 mb-2">
          Price:{" "}
          <span className="text-yellow-500 font-semibold">${price} USD</span>
        </p>

        <p className="text-lg text-gray-300">
          24H Change:{" "}
          <span
            className={`font-semibold ${
              changePercent && parseFloat(changePercent) < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {changePercent}%
          </span>
        </p>

        <button
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-md font-semibold transition"
          onClick={() => navigate("/")}
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default CoinDetail;
