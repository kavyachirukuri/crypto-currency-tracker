import { createContext, useContext, useEffect, useState } from "react";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (coinId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteIcons");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (coinId: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(coinId)
        ? prevFavorites.filter((id) => id !== coinId)
        : [...prevFavorites, coinId];

      localStorage.setItem("favoriteIcons", JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a Favorites Provider");
  }
  return context;
};
