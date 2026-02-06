import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// props: iconName, title, subtitle
export default function TitleSection({ iconName, title, subtitle }) {
  return (
    <View style={styles.titleRow}>
      <View style={styles.iconBox}>
        <View style={styles.iconCircle}>
          <Ionicons name={iconName} size={32} color="#fff" />
        </View>
      </View>
      <View style={styles.titleTextBox}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  iconBox: {
    marginRight: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#a3a1fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextBox: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitleText: {
    fontSize: 14,
    color: '#888',
  },
});
