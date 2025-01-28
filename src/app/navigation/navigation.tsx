// app/navigation/navigation.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ComicsPage from '../../pages/Comics';
import ComicbookDetailsPage from '../../pages/Comics/ComicbookDetailsPage';
import CharactersPage from '../../pages/Characters';
import CharacterDetailsPage from '../../pages/Characters/CharacterDetailsPage';
import ProfileStack from './ProfileStack';
import SettingsPage from '../../pages/Settings';
import Icon from 'react-native-vector-icons/Feather';
import { Platform, ViewStyle } from 'react-native';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import colors from '../../shared/ui/constants/baseStyles';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

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

const Tab = createBottomTabNavigator<TabParamList>();
const CharactersStack = createNativeStackNavigator<CharacterStackParamList>();

const CharactersStackScreen = () => {
  return (
    <CharactersStack.Navigator>
      <CharactersStack.Screen 
        name="CharactersList" 
        component={CharactersPage}
        options={{ headerShown: false }}
      />
      <CharactersStack.Screen 
        name="CharacterDetails" 
        component={CharacterDetailsPage}
        options={{ 
          headerShown: false,
          animation: Platform.OS === "android" ? "fade_from_bottom" : "simple_push",
          animationDuration: Platform.OS === "android" ? undefined : 200, 
        }}
      />
    </CharactersStack.Navigator>
  );
};

type ComicbookStackParamList = {
  ComicsList: undefined;
  ComicbookDetails: { comicbook: number };
  CharacterDetails: { characterId: number };
};


const ComicsStack = createNativeStackNavigator<ComicbookStackParamList>();
const ComicsStackScreen = () => {
  return (
    <ComicsStack.Navigator>
      <ComicsStack.Screen 
        name="ComicsList" 
        component={ComicsPage}
        options={{ headerShown: false }}
      />
      <ComicsStack.Screen 
        name="ComicbookDetails" 
        component={ComicbookDetailsPage}
        options={{ 
          headerShown: false,
          animation: Platform.OS === "android" ? "fade_from_bottom" : "simple_push",
          animationDuration: Platform.OS === "android" ? undefined : 200, 
        }}
      />
      <ComicsStack.Screen 
        name="CharacterDetails" 
        component={CharacterDetailsPage}
        options={{ 
          headerShown: false,
          animation: Platform.OS === "android" ? "fade_from_bottom" : "simple_push",
          animationDuration: Platform.OS === "android" ? undefined : 200, 
        }}
      />
    </ComicsStack.Navigator>
  );
}
function TabNavigator() {
  const { theme } = useTheme();
  const activeColors = colors[theme.mode];
  const { translate, language } = useLanguage();
  const translations = {
    en: { Characters: 'Characters', Comics: 'Comics', Profile: 'Profile', Settings: 'Settings' },
    ru: { Characters: 'Персонажи', Comics: 'Комиксы', Profile: 'Профиль', Settings: 'Настройки' },
  };
  const getTabBarStyle = (route: RouteProp<Record<string, object | undefined>, string>): ViewStyle | null => {
    console.log(route);
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Profile';
    console.log(routeName);
    // if (routeName === 'Register' || routeName === 'Login') {
    //   return null;
    // }

    return {
      paddingBottom: 10,
      height: 60,
      backgroundColor: activeColors.primary,
      borderTopWidth: 0,
    };
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: activeColors.tint,
        tabBarInactiveTintColor: activeColors.secondary,
        tabBarStyle: getTabBarStyle(route),
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Comics':
              iconName = 'book-open';
              break;
            case 'Characters':
              iconName = 'users';
              break;
            case 'ProfileStack':
              iconName = 'user';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size || 20} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Characters"
        component={CharactersStackScreen}
        options={{
          tabBarLabel: translations[language].Characters,
        }}
      />
      <Tab.Screen
        name="Comics"
        component={ComicsStackScreen}
        options={{
          tabBarLabel: translations[language].Comics,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: translations[language].Profile,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          tabBarLabel: translations[language].Settings,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;



// $yandexPassportOauthToken = "y0_AgAAAAB6auCMAATuwQAAAAEdDHO3AABygF0IkHJEo6O4r_wtz8o4PY1-Ww"
// $Body = @{ yandexPassportOauthToken = "$yandexPassportOauthToken" } | ConvertTo-Json -Compress
// $iamTokenResponse = Invoke-RestMethod -Method 'POST' -Uri 'https://iam.api.cloud.yandex.net/iam/v1/tokens' -Body $Body -ContentType 'Application/json'
// $iamToken = $iamTokenResponse.iamToken
// Write-Output $iamToken