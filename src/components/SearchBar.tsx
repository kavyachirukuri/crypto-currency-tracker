import { FC } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
const SearchBar: FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full max-w-md">
      <label className="sr-only" htmlFor="search">
        Search Crypto Coins
      </label>
      <div className="flex items-center border border-zinc-300 bg-white dark:bg-zinc-800 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-gold-500 overflow-hidden">
        <input
          type="search"
          id="search"
          placeholder="Search Crypto Coins..."
          className="w-full p-3 ps-10 text-gray-900 dark:text-white dark:bg-zinc-800 focus:outline-none"
          aria-label="Search for crypto coins"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="absolute left-3 text-gold-500 dark:text-gold-400 w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchBar;
