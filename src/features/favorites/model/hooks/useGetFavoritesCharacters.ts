import { Character } from './../../../character-list/model/types';
import { useState, useEffect, useCallback } from 'react';
import { fireDbFavs } from '../../api/firedb-favs'; // Подключаем API для работы с Firebase

export const useGetFavoritesCharacters = (userId: string | undefined) => {
  const [favoritesCharacters, setFavoritesCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFavoritesCharacters = useCallback(async () => {
    if (!userId) {
      console.warn('User ID is not provided.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const fetchedFavoritesCharacters = await fireDbFavs.fetchFavCharacters(userId);
      setFavoritesCharacters(fetchedFavoritesCharacters);
    } catch (err) {
      console.error('Error fetching favorite characters:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFavoritesCharacters();
  }, [fetchFavoritesCharacters]);

  return {
    favoritesCharacters,
    loading,
    error,
    refetch: fetchFavoritesCharacters, // Для повторной загрузки данных
  };
};
