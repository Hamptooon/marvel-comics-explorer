// app/navigation/ProfileStack.tsx
//TODO ESLINT
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilePage from '../../pages/Profile';
import RegisterPage from '../../pages/Register';
import LoginPage from '../../pages/Login';
import colors from '../../shared/ui/constants/baseStyles';
import {useTheme} from '../contexts/ThemeContext';
import FavoritesPage from '../../pages/Favorites';
import { Platform } from 'react-native';
import ComicbookDetailsPage from '../../pages/Comics/ComicbookDetailsPage';
import CharacterDetailsPage from '../../pages/Characters/CharacterDetailsPage';
export type ProfileStackParamList = {
  Profile: undefined;
  Register: undefined;
  Login: undefined;
  Favorites: undefined;
  ComicbookDetails: { comicbook: number };
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  const {theme, setTheme} = useTheme();
  let activeColors = colors[theme.mode];
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={ProfilePage}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: activeColors.primary },
        }} 
        />
      <Stack.Screen 
        name="Register" 
        component={RegisterPage}
        options={{
          presentation: 'modal',
          headerShown: false,
          headerStyle: { backgroundColor: activeColors.primary },
        }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginPage}
        options={{
          presentation: 'modal',
          headerShown: false,
          headerStyle: { backgroundColor: activeColors.primary  },
        }}
      />
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesPage}
        options={{
          presentation: 'modal',
          headerShown: false,
          headerStyle: { backgroundColor: activeColors.primary  },
          animation: Platform.OS === "android" ? "fade_from_bottom" : "simple_push",
            animationDuration: Platform.OS === "android" ? undefined : 200,
        }}
      />
      <Stack.Screen
        name="ComicbookDetails" 
        component={ComicbookDetailsPage}
        options={{ 
          headerShown: false,
          // animation: Platform.OS === "android" ? "fade_from_bottom" : "simple_push",
          // animationDuration: Platform.OS === "android" ? undefined : 200, 
        }}
      />
      <Stack.Screen 
        name="CharacterDetails" 
        component={CharacterDetailsPage}
        options={{ 
          headerShown: false,
          animation: Platform.OS === "android" ? "fade_from_bottom" : "simple_push",
          animationDuration: Platform.OS === "android" ? undefined : 200, 
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;




