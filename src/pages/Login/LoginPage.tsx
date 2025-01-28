import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../features/auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../app/navigation/ProfileStack';
import InputField from '../../shared/ui/components/InputField';
import ActionButton from '../../shared/ui/components/ActionButton';
import GoogleButton from '../../shared/ui/components/GoogleButton';
import colors from '../../shared/ui/constants/baseStyles';
import {useTheme} from '../../app/contexts/ThemeContext'

type LoginScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Login'>;

const LoginPage: React.FC = () => {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {theme, setTheme} = useTheme();
  let activeColors = colors[theme.mode];

  const handleLogin = async () => {
    try {
      await signInWithEmail(email, password);
      navigation.navigate('Profile');
    } catch (error : any) {
      setError(error.message);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signInWithGoogle();
      navigation.navigate('Profile');
    } catch (error : any) {
      setError(error.message);
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <Text style={[styles.title, { color: activeColors.secondary }]}>Вход</Text>
      <InputField
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        themeColor={activeColors.secondary}
        borderColor={activeColors.tertiary}
      />
      <InputField
        value={password}
        onChangeText={setPassword}
        placeholder="Пароль"
        secureTextEntry
        error={error}
        themeColor={activeColors.secondary}
        borderColor={activeColors.tertiary}
      />
      <ActionButton onPress={handleLogin} text="Login" buttonStyle={{ backgroundColor: activeColors.tint }} textStyle={{ color: '#fff' }} />
      <GoogleButton onPress={handleLoginGoogle} text="Login with Google" themeColor={activeColors.secondary} />
      <ActionButton onPress={handleNavigateToRegister} text="Do you have account? Login" buttonStyle={{ backgroundColor: 'transparent' }} textStyle={{ color: activeColors.tint }} />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default LoginPage;
