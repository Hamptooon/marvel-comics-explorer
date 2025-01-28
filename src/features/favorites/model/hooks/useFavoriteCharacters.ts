// features/favorites/model/hooks/useFavorites.ts
import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { favoritesCharactersService, FavoriteCharacter } from '../favoriteCharacterService';

export const useFavoritesCharacters = (characterId?: number) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesCharacters, setFavoritesCharacters] = useState<FavoriteCharacter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (user) {
      unsubscribe = favoritesCharactersService.subscribeToFavorites(user, (newFavoritesCharacters) => {
        setFavoritesCharacters(newFavoritesCharacters);
        if (characterId) {
          setIsFavorite(newFavoritesCharacters.some(fav => fav.id === characterId));
        }
        setLoading(false);
      });

      if (characterId) {
        favoritesCharactersService.isFavorite(user, characterId)
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
  }, [user, characterId]);

  const toggleFavorite = async (character: {
    id: number;
    name: string;
    thumbnail: { path: string; extension: string };
  }) => {
    if (!user) return;

    try {
      if (isFavorite) {
        await favoritesCharactersService.removeFromFavorites(user, character.id);
      } else {
        await favoritesCharactersService.addToFavorites(user, character);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  return {
    isFavorite,
    favoritesCharacters,
    loading,
    toggleFavorite,
  };
};