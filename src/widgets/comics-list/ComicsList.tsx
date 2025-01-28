// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   FlatList, 
//   ActivityIndicator, 
//   Dimensions,
//   ImageStyle,
//   StyleProp,
//   TouchableOpacity,
// } from 'react-native';
// import axios from 'axios';
// import CryptoJS from 'crypto-js';
// import FastImage from 'react-native-fast-image';
// // import { FlashList } from '@shopify/flash-list';
// import colors from '../../shared/ui/constants/baseStyles';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useTheme } from '../../app/contexts/ThemeContext';
// // import LinearGradient from 'react-native-linear-gradient';
// import SkeletonCard  from '../../shared/ui/components/SkeletonCard';
// const PUBLIC_KEY = '9536a5e5d58bf5dca881ce2291ea9c13';
// const PRIVATE_KEY = 'e68323aaa6a9998179f4b8a6014f6b696ddd6ab5';
// const BATCH_SIZE = 15;
// const WINDOW_WIDTH = Dimensions.get('window').width;
// const ITEM_WIDTH = WINDOW_WIDTH * 0.33;
// const SKELETON_ITEMS = Array(12).fill(null);

// interface Character {
//   id: number;
//   name: string;
//   thumbnail: {
//     path: string;
//     extension: string;
//   };
// }

// type CommonImageProps = {
//   uri: string;
//   style: StyleProp<ImageStyle>;
// };

// const CommonImage: React.FC<CommonImageProps> = ({ uri, style }) => {
//   return (
//     <FastImage
//       source={{
//         uri,
//         priority: FastImage.priority.high,
//         cache: FastImage.cacheControl.immutable
//       }}
//       style={style as StyleProp<ImageStyle>}
//     />
//   );
// };


// const CharactersPage: React.FC = () => {
//   const { theme } = useTheme();
//   const activeColors = colors[theme.mode];
//   const [characters, setCharacters] = useState<Character[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const abortControllerRef = useRef<AbortController | null>(null);
//   const isFirstLoad = useRef(true);
//   const generateAuthParams = useCallback(() => {
//     const timestamp = new Date().getTime();
//     const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();
//     return { timestamp, hash };
//   }, []);
//   const fetchCharacters = useCallback(async (currentOffset: number) => {
//     try {
//       console.log("Fetching characters...");
//       console.log("Offset", currentOffset);
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//       abortControllerRef.current = new AbortController();

//       const { timestamp, hash } = generateAuthParams();
//       const params: Record<string, any> = {
//         ts: timestamp,
//         apikey: PUBLIC_KEY,
//         hash: hash,
//         limit: BATCH_SIZE,
//         offset: currentOffset
//       };

//       const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
//         params,
//         signal: abortControllerRef.current.signal
//       });

//       const filteredCharacters = response.data.data.results.filter(
//         (character: Character) =>
//           character.thumbnail && !character.thumbnail.path.includes('image_not_available')
//       );

//       if (currentOffset === 0) {
//         setCharacters(filteredCharacters);
//       } else {
//         setCharacters(prev => [...prev, ...filteredCharacters]);
//       }
      
//       setOffset(currentOffset + BATCH_SIZE);
//       setHasMore(response.data.data.count === BATCH_SIZE);
//       isFirstLoad.current = false;

//     } catch (error) {
//       if (!axios.isCancel(error)) {
//         console.error('Error loading characters:', error);
//       }
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCharacters(0);
//   }, []);

//   const loadMoreCharacters = useCallback(() => {
//     if (!loadingMore && hasMore) {
//       setLoadingMore(true);
//       fetchCharacters(offset);
//     }
//   }, [loadingMore, hasMore, offset]);

//   const keyExtractor = useCallback((item: Character) => item.id.toString(), []);

//   const RenderCharacterItem = React.memo(({ item }: { item: Character }) => {
//     const navigation = useNavigation<NativeStackNavigationProp<any>>();
//     const imageUrl = `${item.thumbnail.path}/standard_xlarge.${item.thumbnail.extension}`;
    
//     return (
//       <TouchableOpacity 
//         style={styles.characterCard}
//         onPress={() => navigation.navigate('CharacterDetails', { characterId: item.id })}
//       >
//         <CommonImage
//           uri={imageUrl}
//           style={StyleSheet.flatten(styles.characterImage)}
//         />
//         <Text 
//           style={[styles.characterName, { color: activeColors.secondary }]} 
//           numberOfLines={1}
//         >
//           {item.name}
//         </Text>
//       </TouchableOpacity>
//     );
//   });

 
//   if (loading) {
//     return (
//       <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
//         <FlatList
//           data={SKELETON_ITEMS}
//           renderItem={() => <SkeletonCard />}
//           keyExtractor={(_, index) => `skeleton-${index}`}
//           numColumns={3}
//           contentContainerStyle={styles.listContent}
//         />
//       </View>
//     );
//   }
//   return (
//     <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
//       <FlatList
//         data={characters}
//         renderItem={({ item }) => <RenderCharacterItem item={item} />}
//         keyExtractor={keyExtractor}
//         onEndReached={loadMoreCharacters}
//         onEndReachedThreshold={0.3}
//         initialNumToRender={10}
//         windowSize={5}
//         numColumns={3}
//         getItemLayout={(data, index) => ({
//           length: 220,
//           offset: 220 * index,
//           index,
//         })}
//         ListFooterComponent={
//           loadingMore ? <ActivityIndicator size="small" color={activeColors.tint} /> : null
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   listContent: {
//     paddingHorizontal: 4,
//   },
//   characterCard: {
//     width: ITEM_WIDTH,
//     alignItems: 'center',
//     marginVertical: 8,
//     paddingHorizontal: 4,
//   },
//   characterImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//   },
//   characterName: {
//     marginTop: 5,
//     fontSize: 14,
//     textAlign: 'center',
//     paddingHorizontal: 4,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyText: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default CharactersPage;


//TODO исполльзоват alias у импортов, изучить
import React from 'react';
import {FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { ComicbookCard } from '../../features/comics-list/ui/ComicbookCard';
import { useComics } from '../../features/comics-list/model/hooks/useComics';
import SkeletonCard  from '../../shared/ui/components/SkeletonCard/SkeletonCard';
import colors from '../../shared/ui/constants/baseStyles';
import { useTheme } from '../../app/contexts/ThemeContext';
import { Comicbook } from '../../features/comics-list/model/types';
const SKELETON_ITEMS = Array(12).fill(null);

export const ComicsList: React.FC = () => {
  const { theme } = useTheme();
  const activeColors = colors[theme.mode];
  const { 
    comics, 
    loading, 
    loadingMore, 
    loadMoreComics 
  } = useComics();

  const keyExtractor = (item: Comicbook) => item.id.toString();

  if (loading) {
    return (
      // <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
        <FlatList
          data={SKELETON_ITEMS}
          renderItem={() => <SkeletonCard />}
          keyExtractor={(_, index) => `skeleton-${index}`}
          numColumns={3}
          contentContainerStyle={styles.listContent}
        />
      // </View>
    );
  }

  return (
    // <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <FlatList
        data={comics}
        renderItem={({ item }) => <ComicbookCard item={item} />}
        keyExtractor={keyExtractor}
        onEndReached={loadMoreComics}
        onEndReachedThreshold={0.3}
        initialNumToRender={10}
        windowSize={5}
        numColumns={3}
        getItemLayout={(data, index) => ({
          length: 220,
          offset: 220 * index,
          index,
        })}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="small" color={activeColors.tint} /> : null
        }
      />
    // </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 4,
  },
});

export default ComicsList;