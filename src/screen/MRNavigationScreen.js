import React, { useState } from 'react';
import ClinicInput from '../components/ClinicInput';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MRNavigationScreen({ goHome }) {
  const [clinic, setClinic] = useState('');
  const [step, setStep] = useState(0); // 0: 高雄高商, 1: 右側面, 2: 正前面, 3: 側面
  let imageSource;
  if (clinic.trim() === '高雄高商') {
    //imageSource = require('../assets/高雄高商.png');
    step=0;

  } 
    imageSource =
      step === 0
        ? require('../assets/高雄高商.png')
        : step === 1
        ? require('../assets/右側面.png')
        : step === 2
        ? require('../assets/正前面.png')
        : require('../assets/側面.png');
  

  function ButtonBar({ children }) {
    return <View style={styles.buttonBar}>{children}</View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.iconBox}>
          <View style={styles.iconCircle}>
            <Ionicons name="location" size={32} color="#fff" />
          </View>
        </View>
        <View style={styles.titleTextBox}>
          <Text style={styles.titleText}>MR 虛擬導航</Text>
          <Text style={styles.subtitleText}>混合實境引導您到正確的診間</Text>
        </View>
      </View>
      {/* 新增診間輸入元件 */}
      <ClinicInput onChange={setClinic} />
      <View style={styles.headerLeft}>
        <Image source={imageSource} style={{ width: 460, height: 580 }} />
      </View>

      <ButtonBar>
        <TouchableOpacity style={styles.backBtn} onPress={() => setStep(Math.max(0, step - 1))}>
          <Text style={styles.backBtnText}>上一步</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => setStep((step + 1) % 4)}
        >
          <Text style={styles.nextBtnText}>下一步</Text>
        </TouchableOpacity>
      </ButtonBar>

      <TouchableOpacity style={styles.backBtn} onPress={goHome}>
        <Text style={styles.backBtnText}>返回主畫面</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
// 側邊選單樣式


  // ButtonBar 元件
  function ButtonBar({ children }) {
    return <View style={styles.buttonBar}>{children}</View>;
  }
const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#f7f5ee',
    alignItems: 'center',
    paddingTop: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    marginLeft: 18,
    alignSelf: 'flex-start',
  },
  iconBox: {
    marginRight: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextBox: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 2,
    marginBottom: 2,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    letterSpacing: 1,
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    gap: 16,
  },
  backBtn: {
    backgroundColor: '#8bbec7',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  backBtnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  nextBtn: {
    backgroundColor: '#b16ee9',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  disabledBtn: {
    backgroundColor: '#ccc',
  },

});

