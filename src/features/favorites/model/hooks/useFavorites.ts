// features/favorites/model/hooks/useFavorites.ts
import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { favoritesService, FavoriteComic } from '../favoriteService';

export const useFavorites = (comicId?: number) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteComic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (user) {
      unsubscribe = favoritesService.subscribeToFavorites(user, (newFavorites) => {
        setFavorites(newFavorites);
        if (comicId) {
          setIsFavorite(newFavorites.some(fav => fav.id === comicId));
        }
        setLoading(false);
      });

      if (comicId) {
        favoritesService.isFavorite(user, comicId)
          .then(setIsFavorite)
          .catch(console.error)
          .finally(() => setLoading(false));
      }
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, comicId]);

  const toggleFavorite = async (comic: {
    id: number;
    title: string;
    thumbnail: { path: string; extension: string };
  }) => {
    if (!user) return;

    try {
      if (isFavorite) {
        await favoritesService.removeFromFavorites(user, comic.id);
      } else {
        await favoritesService.addToFavorites(user, comic);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  return {
    isFavorite,
    favorites,
    loading,
    toggleFavorite,
  };
};