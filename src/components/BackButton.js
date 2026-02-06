import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// props: onPress, text
export default function BackButton({ onPress, text = '返回主畫面' }) {
  return (
    <TouchableOpacity style={styles.backBtn} onPress={onPress}>
      <Text style={styles.backBtnText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    marginTop: 24,
    backgroundColor: '#a3a1fb',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: 'center',
  },
  backBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
