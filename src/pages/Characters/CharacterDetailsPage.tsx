// // pages/Characters/CharacterDetailsPage.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Dimensions,
//   TouchableOpacity
// } from 'react-native';
// import axios from 'axios';
// import CryptoJS from 'crypto-js';
// import FastImage from 'react-native-fast-image';
// import { useTheme } from '../../app/contexts/ThemeContext';
// import colors from '../../shared/ui/constants/baseStyles';
// import Icon from 'react-native-vector-icons/Feather';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { CompositeScreenProps } from '@react-navigation/native';
// import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// const PUBLIC_KEY = '9536a5e5d58bf5dca881ce2291ea9c13';
// const PRIVATE_KEY = 'e68323aaa6a9998179f4b8a6014f6b696ddd6ab5';
// const WINDOW_WIDTH = Dimensions.get('window').width;

// interface Character {
//   id: number;
//   name: string;
//   thumbnail: {
//     path: string;
//     extension: string;
//   };
// }

// interface CharacterDetails extends Character {
//   description: string;
//   comics: {
//     available: number;
//     items: Array<{ name: string }>;
//   };
//   series: {
//     available: number;
//     items: Array<{ name: string }>;
//   };
//   stories: {
//     available: number;
//     items: Array<{ name: string }>;
//   };
//   events: {
//     available: number;
//     items: Array<{ name: string }>;
//   };
// }

// // Define the param list for the character stack
// type CharacterStackParamList = {
//   CharactersList: undefined;
//   CharacterDetails: { characterId: number };
// };

// // Define the param list for the tab navigator
// type TabParamList = {
//   Characters: undefined;
//   Comics: undefined;
//   ProfileStack: undefined;
//   Settings: undefined;
// };

// // Create a composite type for the screen props
// type Props = CompositeScreenProps<
//   NativeStackScreenProps<CharacterStackParamList, 'CharacterDetails'>,
//   BottomTabScreenProps<TabParamList>
// >;

// const CharacterDetailsPage: React.FC<Props> = ({ route, navigation }) => {
//   const { theme } = useTheme();
//   const activeColors = colors[theme.mode];
//   const [character, setCharacter] = useState<CharacterDetails | null>(null);
//   const [loading, setLoading] = useState(true);

//   const generateAuthParams = () => {
//     const timestamp = new Date().getTime();
//     const hash = CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();
//     return { timestamp, hash };
//   };

//   useEffect(() => {
//     const fetchCharacterDetails = async () => {
//       try {
//         const { timestamp, hash } = generateAuthParams();
//         const response = await axios.get(
//           `https://gateway.marvel.com/v1/public/characters/${route.params.characterId}`,
//           {
//             params: {
//               ts: timestamp,
//               apikey: PUBLIC_KEY,
//               hash: hash,
//             },
//           }
//         );
//         setCharacter(response.data.data.results[0]);
//       } catch (error) {
//         console.error('Error fetching character details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCharacterDetails();
//   }, [route.params.characterId]);

//   if (loading) {
//     return (
//       <View style={[styles.loadingContainer, { backgroundColor: activeColors.primary }]}>
//         <ActivityIndicator size="large" color={activeColors.tint} />
//       </View>
//     );
//   }

//   if (!character) {
//     return (
//       <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
//         <Text style={[styles.errorText, { color: activeColors.secondary }]}>
//           Character not found
//         </Text>
//       </View>
//     );
//   }

//   const imageUrl = `${character.thumbnail.path}/detail.${character.thumbnail.extension}`;

//   return (
//     <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
//       <View style={styles.header}>
//         <TouchableOpacity 
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Icon name="arrow-left" size={24} color={activeColors.secondary} />
//         </TouchableOpacity>
//         <Text style={[styles.headerTitle, { color: activeColors.secondary }]}>
//           Character Details
//         </Text>
//       </View>

//       <ScrollView style={styles.scrollContainer}>
//         <FastImage
//           source={{
//             uri: imageUrl,
//             priority: FastImage.priority.high,
//             cache: FastImage.cacheControl.immutable,
//           }}
//           style={styles.characterImage}
//         />

//         <View style={styles.contentContainer}>
//           <Text style={[styles.characterName, { color: activeColors.secondary }]}>
//             {character.name}
//           </Text>

//           <Text style={[styles.sectionTitle, { color: activeColors.secondary }]}>
//             Description
//           </Text>
//           <Text style={[styles.description, { color: activeColors.secondary }]}>
//             {character.description || 'No description available.'}
//           </Text>

//           <Text style={[styles.sectionTitle, { color: activeColors.secondary }]}>
//             Comics ({character.comics.available})
//           </Text>
//           {character.comics.items.slice(0, 5).map((comic, index) => (
//             <Text 
//               key={index} 
//               style={[styles.listItem, { color: activeColors.secondary }]}
//             >
//               • {comic.name}
//             </Text>
//           ))}

//           <Text style={[styles.sectionTitle, { color: activeColors.secondary }]}>
//             Series ({character.series.available})
//           </Text>
//           {character.series.items.slice(0, 5).map((series, index) => (
//             <Text 
//               key={index} 
//               style={[styles.listItem, { color: activeColors.secondary }]}
//             >
//               • {series.name}
//             </Text>
//           ))}

//           <Text style={[styles.sectionTitle, { color: activeColors.secondary }]}>
//             Events ({character.events.available})
//           </Text>
//           {character.events.items.slice(0, 5).map((event, index) => (
//             <Text 
//               key={index} 
//               style={[styles.listItem, { color: activeColors.secondary }]}
//             >
//               • {event.name}
//             </Text>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(0,0,0,0.1)',
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 16,
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   characterImage: {
//     width: WINDOW_WIDTH,
//     height: WINDOW_WIDTH,
//   },
//   contentContainer: {
//     padding: 16,
//   },
//   characterName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
//   listItem: {
//     fontSize: 14,
//     marginBottom: 4,
//     paddingLeft: 8,
//   },
//   errorText: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default CharacterDetailsPage;

// pages/Characters/CharacterDetailsPage.tsx
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import CharacterInfoBlock from '../../widgets/character-info/CharacterInfoBlock';
import { useAuth } from '../../features/auth/AuthContext';
import { useFavoritesCharacters } from '../../features/favorites/model/hooks/useFavoriteCharacters';

type CharacterStackParamList = {
  CharactersList: undefined;
  CharacterDetails: { characterId: number };
};

type TabParamList = {
  Characters: undefined;
  Comics: undefined;
  ProfileStack: undefined;
  Settings: undefined;
};

type Props = CompositeScreenProps<
  NativeStackScreenProps<CharacterStackParamList, 'CharacterDetails'>,
  BottomTabScreenProps<TabParamList>
>;

const CharacterDetailsPage: React.FC<Props> = ({ route, navigation }) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite, loading: favoritesLoading } = useFavoritesCharacters(route.params.characterId);
  
  console.log("params: ", route.params);
  return (
    <CharacterInfoBlock 
      characterId={route.params.characterId} 
      navigation={navigation} 
      isFavorite={isFavorite}
      onToggleFavorite={toggleFavorite}
      />
  );
};

export default CharacterDetailsPage;