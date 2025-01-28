import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../shared/ui/constants/baseStyles';
import { useTheme } from '../../app/contexts/ThemeContext';
import CharactersList from '../../widgets/character-list/CharacterList';
const CharactersPage: React.FC = () => {
  const { theme } = useTheme();
  const activeColors = colors[theme.mode];

  return (
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <CharactersList/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CharactersPage;