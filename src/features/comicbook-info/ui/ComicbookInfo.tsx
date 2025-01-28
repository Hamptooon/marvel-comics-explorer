// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   ImageBackground,
//   FlatList
// } from 'react-native';
// import FastImage from 'react-native-fast-image';
// import {Character, ComicbookDetails} from '../model/types';
// import Icon from 'react-native-vector-icons/Feather';
// import {BlurView} from '@react-native-community/blur';
// import {useTheme} from '../../../app/contexts/ThemeContext';
// import colors from '../../../shared/ui/constants/baseStyles';
// type ComicbookInfoProps = {
//   comicbook: ComicbookDetails;
//   navigation: any;
// };
// const WINDOW_WIDTH = Dimensions.get('window').width;

// const CharacterInfo = (props: ComicbookInfoProps) => {
//   const {comicbook, navigation} = props;
//   const {theme} = useTheme();
//   const activeColors = colors[theme.mode];
//   const imageUrl = `${comicbook.thumbnail.path}/detail.${comicbook.thumbnail.extension}`;
//   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!comicbook', comicbook.characters);
//   const releaseDate = comicbook.dates.find(
//     date => date.type === 'onsaleDate',
//   )?.date;
//   const price = comicbook.prices.find(
//     price => price.type === 'printPrice',
//   )?.price;

//   const handleCharacterPress = (characterId: number) => {
//     navigation.navigate('CharacterDetails', {characterId : characterId});
//   };

//   const renderCharacterHorizontalList = (items: any[]) => (
//     <FlatList
//       data={items}
//       horizontal
//       keyExtractor={(item, index) => `${item.id}-${index}`}
//       renderItem={({item}) => (
//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => handleCharacterPress(item.id)}>
//           <FastImage
//             style={styles.image}
//             source={{
//               uri: `${item.thumbnail}`,
//             }}
//             resizeMode="cover"
//           />
//           <Text style={styles.cardTitle} numberOfLines={1}>
//             {item.name}
//           </Text>
//         </TouchableOpacity>
//       )}
//       showsHorizontalScrollIndicator={false}
//     />
//   );
//   return (
//     <ImageBackground source={{uri: imageUrl}} style={styles.background}>
//       <BlurView
//         style={StyleSheet.absoluteFill}
//         blurType="dark"
//         blurAmount={10}
//         reducedTransparencyFallbackColor="black"
//       />
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <FastImage source={{uri: imageUrl}} style={styles.thumbnail} />
//         <View style={[styles.content]}>
//           <Text style={[styles.title, {color: activeColors.secondaryLight}]}>
//             {comicbook.title}
//           </Text>
//           {comicbook.description ? (
//             <Text style={[styles.description, {color: activeColors.secondaryLight}]}>
//               {comicbook.description}
//             </Text>
//           ) : (
//             <Text style={[styles.description, {color: activeColors.secondaryLight}]}>
//               Описание отсутствует.
//             </Text>
//           )}
//           <View style={styles.detailsContainer}>
//             <Text style={[styles.detail, {color: activeColors.secondaryLight}]}>
//               🗓 Дата выхода:{' '}
//               {releaseDate
//                 ? new Date(releaseDate).toLocaleDateString()
//                 : 'Неизвестно'}
//             </Text>
//             <Text style={[styles.detail, {color: activeColors.secondaryLight}]}>
//               📖 Страниц: {comicbook.pageCount || 'Неизвестно'}
//             </Text>
//             <Text style={[styles.detail, {color: activeColors.secondaryLight}]}>
//               💲 Цена: {price ? `$${price}` : 'Неизвестно'}
//             </Text>
//           </View>
//           <Text style={[styles.sectionTitle, {color: activeColors.secondaryLight}]}>
//             Персонажи:
//           </Text>
//           {renderCharacterHorizontalList(comicbook.characters)}
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   scrollContent: {
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   thumbnail: {
//     width: WINDOW_WIDTH * 0.8,
//     height: WINDOW_WIDTH * 1.2,
//     borderRadius: 16,
//     marginBottom: 20,
//     overflow: 'hidden',
//   },
//   content: {

//     width: '90%',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     borderRadius: 16,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'justify',
//   },
//   detailsContainer: {
//     marginBottom: 20,
//   },
//   detail: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   card: {
//     width: 120,
//     marginHorizontal: 5,
//     alignItems: 'center',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 8,
//   },
//   cardTitle: {
//     fontSize: 14,
//     color: '#fff',
//     textAlign: 'center',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default CharacterInfo;

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Character, ComicbookDetails} from '../model/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BlurView} from '@react-native-community/blur';
import {useTheme} from '../../../app/contexts/ThemeContext';
import colors from '../../../shared/ui/constants/baseStyles';
import {useAuth} from '../../../features/auth/AuthContext';   
import { useLanguage } from '../../../app/contexts/LanguageContext';
type ComicbookInfoProps = {
  comicbook: ComicbookDetails;
  navigation: any;
  isFavorite: boolean;
  onToggleFavorite: (comic: ComicbookDetails) => Promise<void>;
};
const WINDOW_WIDTH = Dimensions.get('window').width;

const ComicbookInfo = (props: ComicbookInfoProps) => {
  const {isAuthenticated, user} = useAuth();
  const { translate } = useLanguage();
  const { comicbook, navigation, isFavorite, onToggleFavorite } = props;
  const {theme} = useTheme();
  const activeColors = colors[theme.mode];
  const imageUrl = `${comicbook.thumbnail.path}/detail.${comicbook.thumbnail.extension}`;
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!comicbook', comicbook.characters);
  const releaseDate = comicbook.dates.find(
    date => date.type === 'onsaleDate',
  )?.date;
  const price = comicbook.prices.find(
    price => price.type === 'printPrice',
  )?.price;

  const handleCharacterPress = (characterId: number) => {
    navigation.navigate('CharacterDetails', {characterId: characterId});
  };
  const handleToggleFavorite = async () => {
    try {
      await onToggleFavorite(comicbook);                                                          
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  const renderCharacterHorizontalList = (items: any[]) => (
    <FlatList
      data={items}
      horizontal
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCharacterPress(item.id)}>
          <FastImage
            style={styles.image}
            source={{
              uri: `${item.thumbnail}`,
            }}
            resizeMode="cover"
          />
          <Text style={[styles.cardTitle, {color: activeColors.secondary}]} numberOfLines={1}>
            {translate(item.name)}
          </Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
  return (
    <ImageBackground source={{uri: imageUrl}} style={styles.background}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="black"
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <FastImage source={{uri: imageUrl}} style={styles.thumbnail} />
          {isAuthenticated && !user?.isAnonymous && (
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}>
              <Icon
                name={isFavorite ? 'star' : 'star-o'}
                size={24}
                color={isFavorite ? '#ffcd42' : activeColors.secondary}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.content, {backgroundColor: activeColors.primary}]}>
          <Text style={[styles.title, {color: activeColors.secondary}]}>
            {translate(comicbook.title)}
          </Text>
          {comicbook.description ? (
            <Text
              style={[
                styles.description,
                {color: activeColors.secondary},
              ]}>
              {translate(comicbook.description)}
            </Text>
          ) : (
            <Text
              style={[
                styles.description,
                {color: activeColors.secondary},
              ]}>
              {translate("Description absent")}
            </Text>
          )}
          <View style={styles.detailsContainer}>
            <Text style={[styles.detail, {color: activeColors.secondary}]}>
              🗓 {translate("Release date:")}{' '}
              {releaseDate
                ? new Date(releaseDate).toLocaleDateString()
                : 'Неизвестно'}
            </Text>
            <Text style={[styles.detail, {color: activeColors.secondary}]}>
              📖 {translate("Pages:")} {comicbook.pageCount || 'Неизвестно'}
            </Text>
            <Text style={[styles.detail, {color: activeColors.secondary}]}>
              💲 {translate("Price:")} {price ? `$${price}` : 'Неизвестно'}
            </Text>
          </View>
          <Text
            style={[styles.sectionTitle, {color: activeColors.secondary}]}>
            Персонажи:
          </Text>
          {renderCharacterHorizontalList(comicbook.characters)}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  thumbnail: {
    width: WINDOW_WIDTH * 0.8,
    height: WINDOW_WIDTH * 1.2,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  content: {
    width: '90%',
    // backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 26,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    width: 120,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
  },
  header: {
    position: 'relative',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 8,
    borderRadius: 20,
  },
});

export default ComicbookInfo;
