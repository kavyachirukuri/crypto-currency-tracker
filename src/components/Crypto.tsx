import { useState } from "react";
import CoinsList from "./CoinsList";
import SearchBar from "./SearchBar";

const Crypto = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="text-white p-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mt-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <CoinsList searchTerm={searchTerm} />
    </div>
  );
};

export default Crypto;
