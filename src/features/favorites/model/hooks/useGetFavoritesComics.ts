import { Comicbook } from './../../../comics-list/model/types';
import { useState, useEffect, useCallback } from 'react';
import { fireDbFavs } from '../../api/firedb-favs'; // Подключаем API для работы с Firebase

export const useGetFavoritesComics = (userId: string | undefined) => {
  const [favorites, setFavorites] = useState<Comicbook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFavorites = useCallback(async () => {
    if (!userId) {
      console.warn('User ID is not provided.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const fetchedFavorites = await fireDbFavs.fetchFavComics(userId);
      setFavorites(fetchedFavorites);
    } catch (err) {
      console.error('Error fetching favorite comics:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favorites,
    loading,
    error,
    refetch: fetchFavorites, // Для повторной загрузки данных
  };
};
