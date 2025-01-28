// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather'; // Используем Feather icons
// import colors from '../../shared/ui/constants/baseStyles';
// import { useTheme, ThemeTitle } from "../../app/contexts/ThemeContext";

// const SettingsPage = () => {
//   const { theme, updateTheme } = useTheme();
//   const activeColors = colors[theme.mode];

//   return (
//     <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
//       <Text style={[styles.header, { color: activeColors.secondary }]}>Настройки темы</Text>
      
//       <View style={styles.optionContainer}>
//         <TouchableOpacity 
//           style={[styles.option, { backgroundColor: activeColors.secondary }]}
//           onPress={() => updateTheme({ mode: ThemeTitle.light, system: false })}
//         >
//           <View style={styles.iconAndText}>
//             <Icon name="sun" size={20} color={activeColors.primary} style={styles.icon} />
//             <Text style={[styles.optionText, { color: activeColors.primary }]}>Светлая</Text>
//           </View>
//           {theme.mode === ThemeTitle.light && !theme.system && (
//             <View style={styles.checkCircle}>
//               <Icon name="check" size={14} color="#fff" />
//             </View>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.option, { backgroundColor: activeColors.secondary }]}
//           onPress={() => updateTheme({ mode: ThemeTitle.dark, system: false })}
//         >
//           <View style={styles.iconAndText}>
//             <Icon name="moon" size={20} color={activeColors.primary} style={styles.icon} />
//             <Text style={[styles.optionText, { color: activeColors.primary }]}>Темная</Text>
//           </View>
//           {theme.mode === ThemeTitle.dark && !theme.system && (
//             <View style={styles.checkCircle}>
//               <Icon name="check" size={14} color="#fff" />
//             </View>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.option, { backgroundColor: activeColors.secondary }]}
//           onPress={() => updateTheme({ mode: ThemeTitle.dark, system: true })}
//         >
//           <View style={styles.iconAndText}>
//             <Icon name="smartphone" size={20} color={activeColors.primary} style={styles.icon} />
//             <Text style={[styles.optionText, { color: activeColors.primary }]}>Системная</Text>
//           </View>
//           {theme.system && (
//             <View style={styles.checkCircle}>
//               <Icon name="check" size={14} color="#fff" />
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 40,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   optionContainer: {
//     backgroundColor: 'transparent',
//     borderRadius: 10,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 5,
//   },
//   iconAndText: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   optionText: {
//     fontSize: 16,
//   },
//   checkCircle: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: '#52deb4', // Цвет круга с галочкой
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default SettingsPage;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Используем Feather icons
import colors from '../../shared/ui/constants/baseStyles';
import { useTheme, ThemeTitle } from "../../app/contexts/ThemeContext";
import { useLanguage } from "../../app/contexts/LanguageContext";

const SettingsPage = () => {
  const { theme, updateTheme } = useTheme();
  const { translate, setLanguage, language } = useLanguage(); // Подключение контекста языка
  const activeColors = colors[theme.mode];

  return (
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <Text style={[styles.header, { color: activeColors.secondary }]}>{translate('Theme settings')}</Text>
      
      {/* Выбор темы */}
      <View style={styles.optionContainer}>
        <TouchableOpacity 
          style={[styles.option, { backgroundColor: activeColors.secondary }]}
          onPress={() => updateTheme({ mode: ThemeTitle.light, system: false })}
        >
          <View style={styles.iconAndText}>
            <Icon name="sun" size={20} color={activeColors.primary} style={styles.icon} />
            <Text style={[styles.optionText, { color: activeColors.primary }]}>{translate('Light theme')}</Text>
          </View>
          {theme.mode === ThemeTitle.light && !theme.system && (
            <View style={styles.checkCircle}>
              <Icon name="check" size={14} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.option, { backgroundColor: activeColors.secondary }]}
          onPress={() => updateTheme({ mode: ThemeTitle.dark, system: false })}
        >
          <View style={styles.iconAndText}>
            <Icon name="moon" size={20} color={activeColors.primary} style={styles.icon} />
            <Text style={[styles.optionText, { color: activeColors.primary }]}>{translate('Dark theme')}</Text>
          </View>
          {theme.mode === ThemeTitle.dark && !theme.system && (
            <View style={styles.checkCircle}>
              <Icon name="check" size={14} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.option, { backgroundColor: activeColors.secondary }]}
          onPress={() => updateTheme({ mode: ThemeTitle.dark, system: true })}
        >
          <View style={styles.iconAndText}>
            <Icon name="smartphone" size={20} color={activeColors.primary} style={styles.icon} />
            <Text style={[styles.optionText, { color: activeColors.primary }]}>{translate('System theme')}</Text>
          </View>
          {theme.system && (
            <View style={styles.checkCircle}>
              <Icon name="check" size={14} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Выбор языка */}
      <Text style={[styles.header, { color: activeColors.secondary }]}>{translate('Language Settings')}</Text>
      <View style={styles.optionContainer}>
        <TouchableOpacity 
          style={[styles.option, { backgroundColor: activeColors.secondary }]}
          onPress={() => setLanguage('en')}
        >
          <Text style={[styles.optionText, { color: activeColors.primary }]}>English</Text>
          {language === 'en' && (
            <View style={styles.checkCircle}>
              <Icon name="check" size={14} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.option, { backgroundColor: activeColors.secondary }]}
          onPress={() => setLanguage('ru')}
        >
          <Text style={[styles.optionText, { color: activeColors.primary }]}>Русский</Text>
          {language === 'ru' && (
            <View style={styles.checkCircle}>
              <Icon name="check" size={14} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#52deb4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsPage;


// Пример страницы с использованием текущей темы
// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import colors from '../../shared/ui/constants/baseStyles';
// import { useTheme, ThemeTitle } from "../../app/contexts/ThemeContext";

// const SettingsPage = () => {
//   const {theme, setTheme, updateTheme} = useTheme();
//   let activeColors = colors[theme.mode];
//   return (
//     <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
//       <Text style={{ color: activeColors.secondary }}>Настройки</Text>
//       <View>
//             <Text>Current theme: {theme.mode}</Text>
//             <Button title='Темная тема' onPress={() => updateTheme({ mode: ThemeTitle.dark, system: false})}/>
//             <Button title='Светлая тема' onPress={() => updateTheme({ mode: ThemeTitle.light, system: false })}/>
//             <Button title='Системная тема' onPress={() => updateTheme({ mode: ThemeTitle.dark, system: true })}/>
//         </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// export default SettingsPage;
