// src/theme/theme.ts
import { DefaultTheme, Theme } from '@react-navigation/native';

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F4F6FA',
    text: '#333',
    // Добавьте другие цвета для светлой темы
  },
};

export const DarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#171717',
    text: '#f9f9f9',
    // Добавьте другие цвета для темной темы
  },
};
