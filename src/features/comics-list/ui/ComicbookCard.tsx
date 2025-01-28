import React from 'react';
import { Text, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import { FlashList } from '@shopify/flash-list';
import colors from '../../../shared/ui/constants/baseStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../app/contexts/ThemeContext';
// import LinearGradient from 'react-native-linear-gradient';
import CommonImage from '../../../shared/ui/components/CommonImage';
import { ITEM_WIDTH } from '../../../shared/ui/constants/constants';
import { Comicbook } from '../model/types';
import { useLanguage } from '../../../app/contexts/LanguageContext';
interface ComicbookCardProps {
    item: Comicbook;
  }
export const ComicbookCard: React.FC<ComicbookCardProps> = React.memo(({ item }) => {
    const { theme } = useTheme();
    const { translate } = useLanguage();
    const activeColors = colors[theme.mode];
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const imageUrl = `${item.thumbnail.path}/standard_xlarge.${item.thumbnail.extension}`;
    
    return (
      <TouchableOpacity 
        style={styles.comicbookCard}
        onPress={() => navigation.navigate('ComicbookDetails', { comicbookId: item.id })}
      >
        <CommonImage
          uri={imageUrl}
          style={StyleSheet.flatten(styles.comicbookImage)}
        />
        <Text 
          style={[styles.comicbookName, { color: activeColors.secondary }]} 
          numberOfLines={1}
        >
          {translate(item.title)}
        </Text>
      </TouchableOpacity>
    );
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: 4,
    },
    comicbookCard: {
      width: ITEM_WIDTH,
      alignItems: 'center',
      marginVertical: 8,
      paddingHorizontal: 4,
    },
    comicbookImage: {
      width: '100%',
      height: 200,
      borderRadius: 8,
    },
    comicbookName: {
      marginTop: 5,
      fontSize: 14,
      textAlign: 'center',
      paddingHorizontal: 4,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      fontSize: 16,
      textAlign: 'center',
    },
  });
  