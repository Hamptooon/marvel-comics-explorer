import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useAuth } from '../../features/auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../app/navigation/ProfileStack';
import InputField from '../../shared/ui/components/InputField';
import ActionButton from '../../shared/ui/components/ActionButton';
import GoogleButton from '../../shared/ui/components/GoogleButton';
import colors from '../../shared/ui/constants/baseStyles';
import {useTheme} from '../../app/contexts/ThemeContext'
import { useLanguage } from '../../app/contexts/LanguageContext';
type RegisterScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Register'>;

const RegisterPage: React.FC = () => {
   const { translate } = useLanguage();
  const { signUp, signInWithGoogle } = useAuth();
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {theme} = useTheme();
  let activeColors = colors[theme.mode];
  const resetInputFields = () => {
    setEmail('');
    setPassword('');
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    try {
      await signUp(email, password);
      navigation.navigate('Profile');
    } catch (error: any) {
      setError(error.message);
    } finally {
      resetInputFields();
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signInWithGoogle();
      navigation.navigate('Profile');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <Text style={[styles.title, { color: activeColors.secondary }]}>{translate("Registration")}</Text>
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
        secureTextEntry={!showPassword}
        showPasswordToggle
        onTogglePassword={togglePasswordVisibility}
        error={error}
        themeColor={activeColors.secondary}
        borderColor={activeColors.tertiary}
      />
      <ActionButton onPress={handleRegister} text="Registration" buttonStyle={{ backgroundColor: activeColors.tint }} textStyle={{ color: '#fff' }} />
      <GoogleButton onPress={handleLoginGoogle} text="Login with Google" themeColor={activeColors.secondary} />
      <ActionButton onPress={handleNavigateToLogin} text="Do you have account? Login" buttonStyle={{ backgroundColor: 'transparent' }} textStyle={{ color: activeColors.tint }} />
    </KeyboardAvoidingView>
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

export default RegisterPage;
