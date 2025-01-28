import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CharacterDetails} from '../model/types';
import Icon from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '../../../app/contexts/ThemeContext';
import colors from '../../../shared/ui/constants/baseStyles';
import {BlurView} from '@react-native-community/blur';
import { useAuth } from '../../auth/AuthContext';
import { useLanguage } from '../../../app/contexts/LanguageContext';
type CharacterInfoProps = {
  character: CharacterDetails;
  navigation: any;
  isFavorite: boolean;
  onToggleFavorite: (character: CharacterDetails) => Promise<void>;
};
const WINDOW_WIDTH = Dimensions.get('window').width;

const CharacterInfo = (props: CharacterInfoProps) => {
  const { translate } = useLanguage();
  const {isAuthenticated, user} = useAuth();
  const { character, navigation, isFavorite, onToggleFavorite } = props;
  const {theme} = useTheme();
  const activeColors = colors[theme.mode];
  const imageUrl = `${props.character.thumbnail.path}/detail.${props.character.thumbnail.extension}`;
  const handleToggleFavorite = async () => {
    try {
      await onToggleFavorite(character);                                                          
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  return (
    <ImageBackground source={{uri: imageUrl}} style={styles.background}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="black"
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={activeColors.secondaryLight} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: activeColors.secondaryLight}]}>
          {translate("Character Details")}
        </Text>
        {isAuthenticated && !user?.isAnonymous && (
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={handleToggleFavorite}>
                      <IconA
                        name={isFavorite ? 'star' : 'star-o'}
                        size={24}
                        color={isFavorite ? '#ffcd42' : activeColors.secondaryLight}
                      />
                    </TouchableOpacity>
                  )}
      </View>

      <ScrollView style={styles.scrollContainer}>
        <FastImage
          source={{
            uri: imageUrl,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.characterImage}
        />

        <View style={styles.contentContainer}>
          <Text style={[styles.characterName, {color: activeColors.secondaryLight}]}>
            {translate(props.character.name)}
          </Text>
          <Text style={[styles.sectionTitle, {color: activeColors.secondaryLight}]}>
          {translate("Description")}
          </Text>
          <Text style={[styles.description, {color: activeColors.secondaryLight}]}>
            {translate(props.character.description || 'No description available.')}
          </Text>

          {/* <Text style={[styles.sectionTitle, {color: activeColors.secondary}]}>
            Comics ({props.character.comics.available})
          </Text>
          {props.character.comics.items.slice(0, 5).map((comic, index) => (
            <Text
              key={index}
              style={[styles.listItem, {color: activeColors.secondary}]}>
              • {comic.name}
            </Text>
          ))}

          <Text style={[styles.sectionTitle, {color: activeColors.secondary}]}>
            Series ({props.character.series.available})
          </Text>
          {props.character.series.items.slice(0, 5).map((series, index) => (
            <Text
              key={index}
              style={[styles.listItem, {color: activeColors.secondary}]}>
              • {series.name}
            </Text>
          ))}

          <Text style={[styles.sectionTitle, {color: activeColors.secondary}]}>
            Events ({props.character.events.available})
          </Text>
          {props.character.events.items.slice(0, 5).map((event, index) => (
            <Text
              key={index}
              style={[styles.listItem, {color: activeColors.secondary}]}>
              • {event.name}
            </Text>
          ))} */}
        </View>
      </ScrollView>
    
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  characterImage: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH,
  },
  contentContainer: {
    padding: 16,
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 4,
    paddingLeft: 8,
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


export default CharacterInfo;


// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /users/{userId}/favorites/{comicId} {
//       allow read, write: if request.auth != null && request.auth.uid == userId;
//     }
//   }
// }