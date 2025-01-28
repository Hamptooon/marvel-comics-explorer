import { useState, useCallback } from 'react';
import { Character, ComicbookDetails, MarvelApiResponse } from '../types';
import { 
  fetchMarvelComicbook, 
  fetchMarvelCharactersByComicbook, 
} from '../../api/marvel-api';
import axios from 'axios';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150?text=No+Image'; // Заглушка

export const useComicbook = () => {
  const [comicbook, setComicbook] = useState<ComicbookDetails & { characters: Character[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const getComicbook = useCallback(async (comicbookId: number) => {
    setLoading(true);
    try {
      // Запрос информации о комиксе
      const comicbookResponse = await fetchMarvelComicbook(comicbookId);
      const comicbookDetails = comicbookResponse.data.results[0];

      const charactersByComicsResponse = await fetchMarvelCharactersByComicbook(comicbookId);
      const characters = charactersByComicsResponse.data.results.map((character: Character) => ({
        id: character.id,
        name: character.name,
        thumbnail: character.thumbnail?.path && !character.thumbnail.path.includes('image_not_available')
          ? `${character.thumbnail?.path}/standard_medium.${character.thumbnail?.extension}`
          : PLACEHOLDER_IMAGE,
      }));
      console.log(characters);

  

      // Объединяем данные
      setComicbook({
        ...comicbookDetails,
        characters,
      });

    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error fetching comicbook details:', error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    comicbook,
    getComicbook,
  };
};
