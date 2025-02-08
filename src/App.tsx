import "./App.css";
import CoinDetail from "./components/CoinDetail";
import Crypto from "./components/Crypto";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-gradient-to-r from-[#080808] to-[#a19c93] backdrop-blur-xl">
        <nav className="fixed top-0 left-0 w-full bg-white/20 backdrop-blur-lg shadow-xl z-10">
          <div className="p-5 flex justify-center">
            <h1 className="text-2xl text-black-800 font-black">
              Crypto Watchlist App
            </h1>
          </div>
        </nav>

        <div className="pt-20">
          <Router>
            <Routes>
              <Route path="/" element={<Crypto />} />
              <Route path="/coin/:symbol" element={<CoinDetail />} />
            </Routes>
          </Router>
        </div>
      </div>
    </FavoritesProvider>
  );
}

export default App;
