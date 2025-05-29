import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getAllFavoriteTrails,
  removeFavoriteTrail,
  toggleFavoriteTrail,
} from "../screens/HomeScreen/TrailsApi/api";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoriteTrails, setFavoriteTrails] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  const fetchFavorites = useCallback(async () => {
    try {
      setLoadingFavorites(true);
      const result = await getAllFavoriteTrails();
      const trails = result.content || [];
      setFavoriteTrails(trails);
      setFavoriteIds(trails.map((t) => t.trailId));
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    } finally {
      setLoadingFavorites(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (trailId) => {
    await toggleFavoriteTrail(trailId);
    await fetchFavorites();
  };

  const removeFavorite = async (trailId) => {
    await removeFavoriteTrail(trailId);
    await fetchFavorites();
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favoriteTrails,
        loadingFavorites,
        refreshFavorites: fetchFavorites,
        addToFavorites: addFavorite,
        removeFromFavorites: removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
