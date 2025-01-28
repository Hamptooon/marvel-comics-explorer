// features/favorites/model/favoritesService.ts
import firestore from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface FavoriteComic {
  id: number;
  title: string;
  thumbnailPath: string;
  thumbnailExtension: string;
  addedAt: number;
}


export const favoritesService = {
  async addToFavorites(
    user: FirebaseAuthTypes.User,
    comic: {
      id: number;
      title: string;
      thumbnail: { path: string; extension: string };
    },
  ): Promise<void> {
    if (!user) throw new Error('User must be authenticated');

    const favoriteComic: FavoriteComic = {
      id: comic.id,
      title: comic.title,
      thumbnailPath: comic.thumbnail.path,
      thumbnailExtension: comic.thumbnail.extension,
      addedAt: Date.now(),
    };

    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('favorites')
      .doc(comic.id.toString())
      .set(favoriteComic);
  },

  async removeFromFavorites(
    user: FirebaseAuthTypes.User,
    comicId: number,
  ): Promise<void> {
    if (!user) throw new Error('User must be authenticated');

    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('favorites')
      .doc(comicId.toString())
      .delete();
  },

  async isFavorite(
    user: FirebaseAuthTypes.User,
    comicId: number,
  ): Promise<boolean> {
    if (!user) return false;

    try {
        const doc = await firestore()
            .collection('users')
            .doc(user.uid)
            .collection('favorites')
            .doc(comicId.toString())
            .get();

        return doc.exists;
    } catch (error) {
        console.error('Error checking favorite status:', error);
        return false;
    }
  },

  subscribeToFavorites(
    user: FirebaseAuthTypes.User,
    callback: (favorites: FavoriteComic[]) => void,atff
  ) {
    if (!user) return () => {};

    return firestore()
      .collection('users')
      .doc(user.uid)
      .collection('favorites')
      .orderBy('addedAt', 'desc')
      .onSnapshot((snapshot) => {
        const favorites = snapshot.docs.map((doc) => doc.data() as FavoriteComic);
        callback(favorites);
      });
  },
};



