import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FavComics } from '../../features/favorites/ui/FavComics';
import { FavCharacters } from '../../features/favorites/ui/FavCharacters';
import { useAuth } from '../../features/auth/AuthContext';
import {useTheme} from '../../app/contexts/ThemeContext';
import colors from '../../shared/ui/constants/baseStyles';

const FavoriteScreen = () => {
  const {isAuthenticated, user, signOut} = useAuth();
  const {theme} = useTheme();
  const activeColors = colors[theme.mode];
  return (
    <View style={[styles.screen, , {backgroundColor: activeColors.primary}]}>
      <FavCharacters userId={user?.uid}/>
      <FavComics userId={user?.uid} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default FavoriteScreen;
