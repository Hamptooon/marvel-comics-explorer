// features/favorites/model/favoritesService.ts
import firestore from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface FavoriteCharacter {
  id: number;
  title: string;
  thumbnailPath: string;
  thumbnailExtension: string;
  addedAt: number;
}


export const favoritesCharactersService = {
  async addToFavorites(
    user: FirebaseAuthTypes.User,
    character: {
      id: number;
      name: string;
      thumbnail: { path: string; extension: string };
    },
  ): Promise<void> {
    if (!user) throw new Error('User must be authenticated');

    const favoriteCharacter: FavoriteCharacter = {
      id: character.id,
      title: character.name,
      thumbnailPath: character.thumbnail.path,
      thumbnailExtension: character.thumbnail.extension,
      addedAt: Date.now(),
    };

    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('favoritesCharacters')
      .doc(character.id.toString())
      .set(favoriteCharacter);
  },

  async removeFromFavorites(
    user: FirebaseAuthTypes.User,
    characterId: number,
  ): Promise<void> {
    if (!user) throw new Error('User must be authenticated');

    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('favoritesCharacters')
      .doc(characterId.toString())
      .delete();
  },

  async isFavorite(
    user: FirebaseAuthTypes.User,
    characterId: number,
  ): Promise<boolean> {
    if (!user) return false;

    const doc = await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('favoritesCharacters')
      .doc(characterId.toString())
      .get();

    return doc.exists;
  },

  subscribeToFavorites(
    user: FirebaseAuthTypes.User,
    callback: (favoritesCharacters: FavoriteCharacter[]) => void,
  ) {
    if (!user) return () => {};

    return firestore()
      .collection('users')
      .doc(user.uid)
      .collection('favoritesCharacters')
      .orderBy('addedAt', 'desc')
      .onSnapshot((snapshot) => {
        const favoritesCharacters = snapshot.docs.map((doc) => doc.data() as FavoriteCharacter);
        callback(favoritesCharacters);
      });
  },
};



