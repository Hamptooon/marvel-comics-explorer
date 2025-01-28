import firestore from '@react-native-firebase/firestore';
import { Character, ComicbookDetails } from '../../comicbook-info/model/types';
import { Comicbook } from '../../comics-list/model/types';

export const fireDbFavs = {
  /**
   * Получает все избранные комиксы пользователя из Firebase.
   * @param userId - Идентификатор пользователя.
   * @returns Массив объектов с информацией о комиксах.
   */
  async fetchFavComics(userId: string | undefined): Promise<Comicbook[]> {
    try {
      const favoritesSnapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('favorites')
        .get();

      const favoriteIds = favoritesSnapshot.docs.map(doc => doc.id);
        console.log(favoriteIds);
      if (!favoriteIds.length) {
        return [];
      }

      // Формируем массив избранных комиксов
      const favoriteComics: Comicbook[] = favoritesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: parseInt(data.id, 10),
          title: data.title,
          thumbnail: {
            path: data.thumbnailPath,
            extension: data.thumbnailExtension,
          },
        } as Comicbook;
      });
      console.log(favoriteComics);

      return favoriteComics;
    } catch (error) {
      console.error('Error fetching favorite comics:', error);
      throw error;
    }
  },
  async fetchFavCharacters(userId: string | undefined): Promise<Character[]> {
    try {
      const favoritesSnapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('favoritesCharacters')
        .get();

      const favoriteIds = favoritesSnapshot.docs.map(doc => doc.id);
        console.log(favoriteIds);
      if (!favoriteIds.length) {
        return [];
      }

      // Формируем массив избранных комиксов
      const favoriteCharacters: Character[] = favoritesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: parseInt(data.id, 10),
          name: data.title,
          thumbnail: {
            path: data.thumbnailPath,
            extension: data.thumbnailExtension,
          },
        } as Character;
      });
      console.log(favoriteCharacters);

      return favoriteCharacters;
    } catch (error) {
      console.error('Error fetching favorite characters:', error);
      throw error;
    }
  },
};
