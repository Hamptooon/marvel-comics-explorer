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
//   Animated, 
//   Easing 
// } from 'react-native';
// import axios from 'axios';
// import CryptoJS from 'crypto-js';
// import FastImage from 'react-native-fast-image';
// import colors from '../../shared/ui/constants/baseStyles';
// import { useTheme } from '../../app/contexts/ThemeContext';
// import debounce from 'lodash/debounce';

// const PUBLIC_KEY = '9536a5e5d58bf5dca881ce2291ea9c13';
// const PRIVATE_KEY = 'e68323aaa6a9998179f4b8a6014f6b696ddd6ab5';
// const BATCH_SIZE = 15;
// const WINDOW_WIDTH = Dimensions.get('window').width;
// const ITEM_WIDTH = WINDOW_WIDTH * 0.9;

// interface Comic {
//   id: number;
//   title: string;
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

// const SkeletonCard = () => {
//   const animatedValue = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const startAnimation = () => {
//       Animated.sequence([
//         Animated.timing(animatedValue, {
//           toValue: 1,
//           duration: 1000,
//           easing: Easing.ease,
//           useNativeDriver: false,
//         }),
//         Animated.timing(animatedValue, {
//           toValue: 0,
//           duration: 1000,
//           easing: Easing.ease,
//           useNativeDriver: false,
//         })
//       ]).start((finished) => {
//         if (finished) {
//           startAnimation();
//         }
//       });
//     };

//     startAnimation();
    
//     return () => {
//       animatedValue.setValue(0);
//     };
//   }, []);

//   const opacity = animatedValue.interpolate({
//     inputRange: [0, 0.5, 1],
//     outputRange: [0.3, 0.7, 0.3]
//   });

//   return (
//     <View style={styles.comicCard}>
//       <Animated.View 
//         style={[
//           styles.skeletonImage,
//           { opacity }
//         ]}
//       />
//       <Animated.View 
//         style={[
//           styles.skeletonText,
//           { opacity }
//         ]}
//       />
//     </View>
//   );
// };

// const ComicsPage: React.FC = () => {
//   const { theme } = useTheme();
//   const activeColors = colors[theme.mode];
//   const [comics, setComics] = useState<Comic[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const abortControllerRef = useRef<AbortController | null>(null);

//   const generateAuthParams = useCallback(() => {
//     const timestamp = new Date().getTime();
//     const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();
//     return { timestamp, hash };
//   }, []);

//   const fetchComics = useCallback(async (currentOffset: number) => {
//     try {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//       abortControllerRef.current = new AbortController();

//       const { timestamp, hash } = generateAuthParams();
//       const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
//         params: {
//           ts: timestamp,
//           apikey: PUBLIC_KEY,
//           hash: hash,
//           limit: BATCH_SIZE,
//           offset: currentOffset,
//         },
//         signal: abortControllerRef.current.signal,
//       });

//       const filteredComics = response.data.data.results.filter(
//         (comic: Comic) =>
//           comic.thumbnail && !comic.thumbnail.path.includes('image_not_available')
//       );

//       if (currentOffset === 0) {
//         setComics(filteredComics);
//       } else {
//         setComics((prev) => {
//           const newComics = filteredComics.filter(
//             (comic: Comic) => !prev.some((existingComic) => existingComic.id === comic.id)
//           );
//           return [...prev, ...newComics];
//         });
//       }

//       setOffset(currentOffset + BATCH_SIZE);
//       setHasMore(response.data.data.count === BATCH_SIZE);
//     } catch (error) {
//       if (!axios.isCancel(error)) {
//         console.error('Error loading comics:', error);
//       }
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchComics(0);
//   }, []);

//   const loadMoreComics = useCallback(() => {
//     if (!loadingMore && hasMore) {
//       setLoadingMore(true);
//       fetchComics(offset);
//     }
//   }, [loadingMore, hasMore, offset]);

//   const RenderComicItem = React.memo(({ item }: { item: Comic }) => {
//     const imageUrl = `${item.thumbnail.path}/portrait_uncanny.${item.thumbnail.extension}`;
//     return (
//       <View style={styles.comicCard}>
//         <CommonImage uri={imageUrl} style={styles.comicImage} />
//         <Text
//           style={[styles.comicTitle, { color: activeColors.secondary }]}
//           numberOfLines={2}
//         >
//           {item.title}
//         </Text>
//       </View>
//     );
//   });

//   if (loading) {
//     return (
//       <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
//         <FlatList
//           data={Array(10).fill(null)}
//           renderItem={() => <SkeletonCard />}
//           keyExtractor={(_, index) => `skeleton-${index}`}
//           numColumns={3} // Для скелетонов тоже применяем разбивку
//           columnWrapperStyle={styles.rowWrapper}
//         />
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
//       <FlatList
//         data={comics}
//         renderItem={({ item }) => <RenderComicItem item={item} />}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={3} // Задаем три колонки
//         columnWrapperStyle={styles.rowWrapper}
//         onEndReached={loadMoreComics}
//         onEndReachedThreshold={0.3}
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
//   rowWrapper: {
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   comicCard: {
//     flex: 1,
//     margin: 5,
//     alignItems: 'center',
//     borderRadius: 8,
//     backgroundColor: '#222',
//     padding: 10,
//   },
//   comicImage: {
//     width: '100%',
//     aspectRatio: 1, // Чтобы изображения были квадратными
//     borderRadius: 8,
//   },
//   comicTitle: {
//     marginTop: 8,
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   skeletonImage: {
//     width: '100%',
//     aspectRatio: 1,
//     borderRadius: 8,
//     backgroundColor: '#666',
//   },
//   skeletonText: {
//     width: '80%',
//     height: 14,
//     marginTop: 10,
//     borderRadius: 4,
//     backgroundColor: '#666',
//   },
// });


// export default ComicsPage;


import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../shared/ui/constants/baseStyles';
import { useTheme } from '../../app/contexts/ThemeContext';
import ComicsList from '../../widgets/comics-list/ComicsList';
const ComicsPage: React.FC = () => {
  const { theme } = useTheme();
  const activeColors = colors[theme.mode];

  return (
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <ComicsList/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ComicsPage;