import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface TextFieldProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  title,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text>{title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 10,
  },
  input: {
    maxHeight: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
