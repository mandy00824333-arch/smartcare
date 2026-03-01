import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function ClinicInput({ onChange }) {
  const [value, setValue] = useState('');

  const handleChange = (text) => {
    setValue(text);
    if (onChange) onChange(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>請輸入您要前往的診間：</Text>
      <TextInput
        style={styles.input}
        placeholder="例如：心臟內科、201診間..."
        value={value}
        onChangeText={handleChange}
        accessibilityLabel="診間輸入框"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 18,
    marginTop: 8,
  },
  label: {
    fontSize: 20,
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b16ee9',
    borderRadius: 12,
    padding: 12,
    fontSize: 18,
    backgroundColor: '#fff',
  },
});
