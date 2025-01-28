// import React from 'react';
// import {View, Text, StyleSheet, Image} from 'react-native';
// import {useAuth} from '../../features/auth/AuthContext';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {ProfileStackParamList} from '../../app/navigation/ProfileStack';
// import ActionButton from '../../shared/ui/components/ActionButton';
// import colors from '../../shared/ui/constants/baseStyles';
// import {useTheme} from '../../app/contexts/ThemeContext';
// import Icon from 'react-native-vector-icons/Feather';

// type ProfileNavigationProp = NativeStackNavigationProp<
//   ProfileStackParamList,
//   'Profile'
// >;

// const ProfilePage: React.FC = () => {
//   const {isAuthenticated, user, signOut} = useAuth();
//   const navigation = useNavigation<ProfileNavigationProp>();
//   const {theme} = useTheme();
//   const activeColors = colors[theme.mode];

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       navigation.navigate('Register');
//     } catch (error) {
//       console.error('signOut Failed: ', error);
//     }
//   };

//   return (
//     <View style={[styles.container, {backgroundColor: activeColors.primary}]}>
//       {/* User avatar */}
//       <View style={styles.avatarContainer}>
//         <Image
//           source={{
//             uri: user?.photoURL || 'https://via.placeholder.com/150',
//           }}
//           style={styles.avatar}
//         />
//         <Text style={[styles.username, {color: activeColors.secondary}]}>
//           {isAuthenticated && !user?.isAnonymous
//             ? user?.email || 'User'
//             : 'Гость'}
//         </Text>
//       </View>

//       {/* Welcome message */}
//       {isAuthenticated && !user?.isAnonymous ? (
//         <View style={styles.authenticatedContainer}>
//           <Text
//             style={[styles.welcomeMessage, {color: activeColors.secondary}]}>
//             Добро пожаловать, {user?.email || 'User'}!
//           </Text>
//           <ActionButton
//             onPress={handleSignOut}
//             text="Выйти"
//             buttonStyle={{backgroundColor: 'red', padding: 12}}
//             textStyle={styles.buttonText}
//           />
//         </View>
//       ) : (
//         <View style={styles.guestContainer}>
//           <Text
//             style={[styles.welcomeMessage, {color: activeColors.secondary}]}>
//             Вы вошли как гость.
//           </Text>
//           <ActionButton
//             onPress={() => navigation.navigate('Register')}
//             text="Зарегистрироваться / Войти"
//             buttonStyle={{backgroundColor: activeColors.tint, padding: 12}}
//             textStyle={{color: '#fff'}}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: '#fff',
//     marginBottom: 10,
//   },
//   username: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   welcomeMessage: {
//     fontSize: 18,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   authenticatedContainer: {
//     alignItems: 'center',
//   },
//   guestContainer: {
//     alignItems: 'center',
//   },
//   actionButton: {
//     width: 200,
//     paddingVertical: 12,
//     borderRadius: 25,
//     marginTop: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//   },
// });

// export default ProfilePage;

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useAuth} from '../../features/auth/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../app/navigation/ProfileStack';
import ActionButton from '../../shared/ui/components/ActionButton';
import colors from '../../shared/ui/constants/baseStyles';
import {useTheme} from '../../app/contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';
import { fireDbFavs } from '../../features/favorites/api/firedb-favs';
import {translateText} from '../../shared/lib/yandex-translate-api';
import { useLanguage } from '../../app/contexts/LanguageContext';
type ProfileNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  'Profile'
>;

const ProfilePage: React.FC = () => {
  const {translate} = useLanguage();
  const {isAuthenticated, user, signOut} = useAuth();
  const navigation = useNavigation<ProfileNavigationProp>();
  const {theme} = useTheme();
  const activeColors = colors[theme.mode];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.navigate('Register');
    } catch (error) {
      console.error('signOut Failed: ', error);
    }
  };
  const testTranslate = async () => {
    translateText("Dark theme", "ru")
  .then((result) => console.log("Перевод:", result))
  .catch((error) => console.error("Ошибка:", error));
  };
  const handleFavorites = () => {
    navigation.navigate('Favorites'); // Предполагается, что в ProfileStack есть экран "Favorites"
  };

  return (
    <View style={[styles.container, {backgroundColor: activeColors.primary}]}>
      {/* User avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: user?.photoURL || 'https://via.placeholder.com/150',
          }}
          style={styles.avatar}
        />
        <Text style={[styles.username, {color: activeColors.secondary}]}>
          {isAuthenticated && !user?.isAnonymous
            ? user?.email || 'User'
            : 'Guest'}
        </Text>
      </View>

      {/* Welcome message */}
      {isAuthenticated && !user?.isAnonymous ? (
        <View style={styles.authenticatedContainer}>
          <Text
            style={[styles.welcomeMessage, {color: activeColors.secondary}]}>
            {translate("Welcome,")} {user?.email || 'User'}!
          </Text>
          <ActionButton
            onPress={handleSignOut}
            text="Logout"
            buttonStyle={{backgroundColor: 'red', padding: 12}}
            textStyle={styles.buttonText}
          />
          {/* <ActionButton
            onPress={testTranslate}
            text="Translate"
            buttonStyle={{backgroundColor: 'green', padding: 12}}
            textStyle={styles.buttonText}
          /> */}
          <ActionButton
            onPress={handleFavorites}
            text="Favorites"
            buttonStyle={{
              backgroundColor: activeColors.fav,
              padding: 12,
              marginTop: 10,
            }}
            textStyle={{color: '#fff'}}
          />
        </View>
      ) : (
        <View style={styles.guestContainer}>
          <Text
            style={[styles.welcomeMessage, {color: activeColors.secondary}]}>
            Вы вошли как гость.
          </Text>
          <ActionButton
            onPress={() => navigation.navigate('Register')}
            text="Registration / Login"
            buttonStyle={{backgroundColor: activeColors.tint, padding: 12}}
            textStyle={{color: '#fff'}}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  welcomeMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  authenticatedContainer: {
    alignItems: 'center',
  },
  guestContainer: {
    alignItems: 'center',
  },
  actionButton: {
    width: 200,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProfilePage;


// $yandexPassportOauthToken = "y0_AgAAAAB6auCMAATuwQAAAAEdDHO3AABygF0IkHJEo6O4r_wtz8o4PY1-Ww"
// $Body = @{ yandexPassportOauthToken = "$yandexPassportOauthToken" } | ConvertTo-Json -Compress
// $iamTokenResponse = Invoke-RestMethod -Method 'POST' -Uri 'https://iam.api.cloud.yandex.net/iam/v1/tokens' -Body $Body -ContentType 'Application/json'
// $iamToken = $iamTokenResponse.iamToken
// Write-Output $iamToken