import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../../../../app/contexts/LanguageContext';

interface ActionButtonProps {
  onPress: () => void;
  text: string;
  buttonStyle: object;
  textStyle: object;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onPress, text, buttonStyle, textStyle }) => {
  const { translate } = useLanguage();
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{translate(text)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ActionButton;
