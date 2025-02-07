import { FC, useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FcNext, FcPrevious } from "react-icons/fc";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { fetchCryptoData } from "../api/binance";
import { useFavorites } from "../context/FavoritesContext";
import { CryptoData } from "../types/cryptoTypes";

interface CoinsListProps {
  searchTerm: string;
}

const CoinsList: FC<CoinsListProps> = ({ searchTerm }) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("all");

  const navigate = useNavigate();

  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoData();
      setCryptoData(data);
      setLoading(false);
    };

    getData();
    const interval = setInterval(getData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  const filteredData = cryptoData.filter((coin) =>
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteData = cryptoData
    .filter((coin) => favorites.includes(coin.symbol))
    .filter((coin) =>
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(
    (activeTab === "all" ? filteredData.length : favoriteData.length) /
      itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems =
    activeTab === "all"
      ? filteredData.slice(startIndex, endIndex)
      : favoriteData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleView = (symbol: string) => {
    navigate(`/coin/${symbol}`);
  };

  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "all"
              ? "border-b-2 border-gold-500 text-gold-500"
              : "text-white-500"
          }`}
          onClick={() => {
            setActiveTab("all");
            setCurrentPage(1);
          }}
        >
          All Coins
        </button>
        <button
          className={`px-4 py-2 ml-4 ${
            activeTab === "favorites"
              ? "border-b-2 border-gold-500 text-gold-500"
              : "text-white-500"
          }`}
          onClick={() => {
            setActiveTab("favorites");
            setCurrentPage(1);
          }}
        >
          Favorite Coins
        </button>
      </div>

      <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">24H Change</th>
            <th className="px-4 py-2 text-left">24H Volume</th>
            <th className="px-4 py-2 text-left">Market Cap</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((coin, index) => (
              <tr
                key={coin.symbol}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2 text-center">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-2 text-left">{coin.symbol}</td>
                <td className="px-4 py-2">
                  ${parseFloat(coin.lastPrice).toFixed(3)}
                </td>
                <td
                  className={`px-4 py-2 ${
                    parseFloat(coin.priceChangePercent) < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {parseFloat(coin.priceChangePercent).toFixed(3)}%
                </td>
                <td className="px-4 py-2">
                  {parseFloat(coin.volume).toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  ${(parseFloat(coin.quoteVolume) / 1e9).toFixed(3)} B
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-900 p-1 mr-1 rounded-md hover:bg-blue-600"
                    title="view"
                    onClick={() => handleView(coin.symbol)}
                  >
                    <GrView />
                  </button>
                  <button
                    className="bg-blue-900 p-1 rounded-md hover:bg-blue-600"
                    title={
                      favorites.includes(coin.symbol)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    onClick={() => toggleFavorite(coin.symbol)}
                  >
                    {favorites.includes(coin.symbol) ? (
                      <span className="text-gold-400">
                        <FaStar />
                      </span>
                    ) : (
                      <FaRegStar />
                    )}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="text-center text-gray-500 dark:text-gray-400 py-4"
              >
                No favorite coins added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          className="px-3 py-1 bg-zinc-400 text-gray-700 rounded-md mx-1 hover:bg-gray-400"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FcPrevious />
        </button>
        <span className="px-4 py-2 text-gold-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-zinc-400 text-gray-700 rounded-md mx-1 hover:bg-gray-400"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FcNext />
        </button>
      </div>
    </div>
  );
};

export default CoinsList;
