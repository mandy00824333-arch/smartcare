import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HealthEducationScreen({ goHome }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>互動功能（開發中）</Text>
      <TouchableOpacity style={styles.backBtn} onPress={goHome}>
        <Text style={styles.backBtnText}>返回主畫面</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7f5ee' },
  text: { fontSize: 22, color: '#333' },
  backBtn: { backgroundColor: '#8bbec7', borderRadius: 20, paddingVertical: 16, paddingHorizontal: 48 },
  backBtnText: { color: '#fff', fontSize: 22, fontWeight: 'bold', letterSpacing: 2 },
});
