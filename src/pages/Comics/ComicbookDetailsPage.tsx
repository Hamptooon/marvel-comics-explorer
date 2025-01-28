
// import React from 'react';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { CompositeScreenProps } from '@react-navigation/native';
// import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import ComicbookInfoBlock from '../../widgets/comicbook-info/ComicbookInfoBlock';


// type ComicbookStackParamList = {
//   ComicsList: undefined;
//   ComicbookDetails: { comicbookId: number };
//   CharacterDetails: { characterId: number };
// };

// type TabParamList = {
//   Characters: undefined;
//   Comics: undefined;
//   ProfileStack: undefined;
//   Settings: undefined;
// };

// type Props = CompositeScreenProps<
//   NativeStackScreenProps<ComicbookStackParamList, 'ComicbookDetails'>,
//   BottomTabScreenProps<TabParamList>
// >;

// const ComicbookDetailsPage: React.FC<Props> = ({ route, navigation }) => {
//   return (
//     <ComicbookInfoBlock comicbookId={route.params.comicbookId} navigation={navigation} />
//   );
// };

// export default ComicbookDetailsPage;


// pages/Comics/ComicbookDetailsPage.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import ComicbookInfoBlock from '../../widgets/comicbook-info/ComicbookInfoBlock';
import { useAuth } from '../../features/auth/AuthContext';
import { useFavorites } from '../../features/favorites/model/hooks/useFavorites';

type ComicbookStackParamList = {
  ComicsList: undefined;
  ComicbookDetails: { comicbookId: number };
  CharacterDetails: { characterId: number };
};

type TabParamList = {
  Characters: undefined;
  Comics: undefined;
  ProfileStack: undefined;
  Settings: undefined;
};

type Props = CompositeScreenProps<
  NativeStackScreenProps<ComicbookStackParamList, 'ComicbookDetails'>,
  BottomTabScreenProps<TabParamList>
>;

const ComicbookDetailsPage: React.FC<Props> = ({ route, navigation }) => {
  const { comicbookId } = route.params;
  const { user } = useAuth();
  const { isFavorite, toggleFavorite, loading: favoritesLoading } = useFavorites(comicbookId);

  return (
    <View style={styles.container}>
      <ComicbookInfoBlock
        comicbookId={comicbookId}
        navigation={navigation}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ComicbookDetailsPage;