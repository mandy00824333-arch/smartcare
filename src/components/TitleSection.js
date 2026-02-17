import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// props: iconName, title, subtitle
const TitleSection = ({ iconName, title, subtitle }) => {
  const { width } = useWindowDimensions();
  // 響應式尺寸
  const iconSize = Math.max(28, Math.round(width * 0.08));
  const iconCircleSize = Math.max(40, Math.round(width * 0.13));
  const titleFontSize = Math.max(18, Math.round(width * 0.05));
  const subtitleFontSize = Math.max(12, Math.round(width * 0.035));
  return (
    <View style={[styles.titleRow, { marginTop: width * 0.02 }] }>
      <View style={styles.iconBox}>
        <View style={[styles.iconCircle, { width: iconCircleSize, height: iconCircleSize, borderRadius: iconCircleSize / 2 }] }>
          <Ionicons name={iconName} size={iconSize} color="#fff" />
        </View>
      </View>
      <View style={styles.titleTextBox}>
        <Text style={[styles.titleText, { fontSize: titleFontSize }]}>{title}</Text>
        <Text style={[styles.subtitleText, { fontSize: subtitleFontSize }]}>{subtitle}</Text>
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
