import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function GameScreen({ goHome }) {
  // 移除 menuOpen 狀態
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.iconBox}>
          <View style={styles.iconCircle}>
            <Ionicons name="game-controller" size={32} color="#fff" />
          </View>
        </View>
        <View style={styles.titleTextBox}>
          <Text style={styles.titleText}>健康遊戲</Text>
          <Text style={styles.subtitleText}>寓教於樂學健康</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.backBtn} onPress={goHome}>
        <Text style={styles.backBtnText}>返回主畫面</Text>
      </TouchableOpacity>
    </ScrollView>
  );
// 側邊選單樣式
const sideMenuStyles = {
  sideMenuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    zIndex: 100,
  },
  sideMenu: {
    width: 220,
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: '#eee',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  sideMenuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemIcon: {
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 20,
    color: '#888',
  },
};

Object.assign(styles, sideMenuStyles);
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#f7f5ee', paddingTop: 16 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    marginLeft: 18,
    alignSelf: 'flex-start',
  },
  iconBox: { marginRight: 16 },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextBox: { flexDirection: 'column', justifyContent: 'center' },
  titleText: { fontSize: 28, fontWeight: 'bold', color: '#222', letterSpacing: 2, marginBottom: 2 },
  subtitleText: { fontSize: 16, color: '#666', letterSpacing: 1 },
  backBtn: { backgroundColor: '#8bbec7', borderRadius: 20, paddingVertical: 16, paddingHorizontal: 48 },
  backBtnText: { color: '#fff', fontSize: 22, fontWeight: 'bold', letterSpacing: 2 },
});
