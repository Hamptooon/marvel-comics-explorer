import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  error?: string;
  themeColor: string;
  borderColor: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  showPasswordToggle = false,
  onTogglePassword,
  error,
  themeColor,
  borderColor,
}) => {
  return (
    <View style={{ width: '100%' }}>
      <TextInput
        style={[styles.input, { borderColor, color: themeColor }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#3d3d3d"
      />
      {showPasswordToggle && (
        <TouchableOpacity onPress={onTogglePassword} style={styles.eyeIcon}>
          <Icon name={secureTextEntry ? 'eye-slash' : 'eye'} size={20} color={themeColor} />
        </TouchableOpacity>
      )}
      {error && <Text style={[styles.errorText, { color: 'red' }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    paddingRight: 35,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
    zIndex: 10,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
});

export default InputField;
