import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLanguage } from '../../../../app/contexts/LanguageContext';

interface GoogleButtonProps {
  onPress: () => void;
  text: string;
  themeColor: string;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onPress, text, themeColor }) => {
   const { translate } = useLanguage();
  return (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      <Icon name="google" size={20} color="#4fd185" style={styles.googleIcon} />
      <Text style={[styles.googleButtonText, { color: themeColor }]}>{translate(text)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#242424',
  },
  googleIcon: {
    marginRight: 8,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GoogleButton;
