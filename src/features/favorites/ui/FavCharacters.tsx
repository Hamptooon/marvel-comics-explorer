import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import { CharacterCard } from '../../character-list/ui/Character/CharacterCard';
import { useGetFavoritesCharacters } from '../model/hooks/useGetFavoritesCharacters';
import colors from '../../../shared/ui/constants/baseStyles';
import { useTheme } from '../../../app/contexts/ThemeContext';
import { useFocusEffect } from '@react-navigation/native'; 
interface FavCharactersProps {
  userId: string | undefined;
}

export const FavCharacters: React.FC<FavCharactersProps> = ({ userId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { favoritesCharacters, loading, error, refetch } = useGetFavoritesCharacters(userId);
  const { theme } = useTheme();
  const activeColors = colors[theme.mode];

  const toggleAccordion = () => setIsExpanded(!isExpanded);
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );
  const renderAccordionButton = () => (
    <TouchableOpacity
      style={[styles.accordionButton, { backgroundColor: activeColors.primary, borderColor: activeColors.secondary, borderBottomWidth:1  }]}
      onPress={toggleAccordion}
    >
      <Text style={[styles.accordionText, { color: activeColors.secondary }]}>
        Избранные персонажи
      </Text>
      <Image
        style={[
          styles.arrowIcon,
          { tintColor: activeColors.secondary },
          isExpanded && styles.arrowRotated,
        ]}
        source={require('../../../shared/assets/arrow-down.png')}
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={activeColors.tint} />
      </View>
    );
  }

  if (error) {
    return (
      <Text style={[styles.errorText, { color: activeColors.tint }]}>
        Ошибка: {error.message}
      </Text>
    );
  }

  return (
    <View style={[styles.container]}>
      {renderAccordionButton()}

      {isExpanded && (
        <View style={[{ backgroundColor: activeColors.primary }]}>
          {favoritesCharacters.length > 0 ? (
            <FlatList
              data={favoritesCharacters}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <CharacterCard item={item} />}
              contentContainerStyle={styles.listContent}
              numColumns={3}
              columnWrapperStyle={styles.columnWrapper}
            />
          ) : (
            <Text style={[styles.emptyText, { color: activeColors.secondary }]}>
              У вас пока нет избранных персонажей.
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  accordionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  accordionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    transform: [{ rotate: '0deg' }],
    transition: 'transform 0.2s',
  },
  arrowRotated: {
    transform: [{ rotate: '180deg' }],
  },
  listContent: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    padding: 16,
    textAlign: 'center',
  },
  emptyText: {
    padding: 16,
    textAlign: 'center',
    fontSize: 14,
  },
});
