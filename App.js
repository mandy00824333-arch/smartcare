import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import RegisterScreen from './.expo/src/screen/RegisterScreen';
import OnlineRegisterScreen from './.expo/src/screen/OnlineRegisterScreen';
import RevisitReminderScreen from './.expo/src/screen/RevisitReminderScreen';
import EmergencyCallScreen from './.expo/src/screen/EmergencyCallScreen';
import AppointmentReminderScreen from './.expo/src/screen/AppointmentReminderScreen';
import MedicationReminderScreen from './.expo/src/screen/MedicationReminderScreen';
import MRNavigationScreen from './.expo/src/screen/MRNavigationScreen';
import HealthEducationScreen from './.expo/src/screen/HealthEducationScreen';
import ChatScreen from './.expo/src/screen/ChatScreen';
import GameScreen from './.expo/src/screen/GameScreen';


export default function App() {
  const [page, setPage] = useState('welcome');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const goHome = () => setPage('home');
  const menuList = [
    { title: '首頁', icon: 'home', page: 'home' },
    { title: '緊急呼叫', icon: 'call', page: 'emergency' },
    { title: '用藥提醒', icon: 'medkit', page: 'medication' },
    { title: '預約掛號', icon: 'calendar', page: 'onlineRegister' },
    { title: '回診提醒', icon: 'notifications', page: 'revisitReminder' },
    { title: 'MR導航', icon: 'location', page: 'mrNavigation' },
    { title: '健康教育', icon: 'book', page: 'health' },
    { title: '聊天室', icon: 'chatbubble', page: 'chat' },
    { title: '健康遊戲', icon: 'game-controller', page: 'game' },
  ];

  // 所有頁面都共用固定標題列
  let content = null;
  if (page === 'welcome') {
    content = (
      <View style={styles.welcomeContainer}>
        {/* 標題置頂置中 */}
        <View style={styles.welcomeHeader}>
          <Text style={styles.welcomeAppTitle}>護你同在</Text>
        </View>
        {/* 中間 icon */}
        <View style={styles.welcomeIconWrap}>
          <Image source={require('./assets/center-icon.png')} style={styles.welcomeCenterIcon} />
        </View>
        {/* 按鈕區塊 */}
        <View style={styles.welcomeBtnGroup}>
          <TouchableOpacity style={styles.welcomeBtn} onPress={() => setPage('register')}>
            <Text style={styles.welcomeBtnText}>註冊</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.welcomeBtn} onPress={() => setPage('home')}>
            <Text style={styles.welcomeBtnText}>登入</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (page === 'home') {
    const services = [
      { title: '緊急呼叫', subtitle: '一鍵求助', icon: 'call', color: '#e74c3c', page: 'emergency' },
      { title: '用藥提醒', subtitle: '準時服藥', icon: 'medkit', color: '#16a085', page: 'medication' },
      { title: '線上掛號', subtitle: '預約門診', icon: 'calendar', color: '#9b59b6', page: 'onlineRegister' },
      { title: '回診提醒', subtitle: '追蹤預約', icon: 'notifications', color: '#f39c12', page: 'revisitReminder' },
      { title: 'MR導航', subtitle: '虛擬實境導覽', icon: 'location', color: '#e74c3c', page: 'mrNavigation' },
      { title: '健康教育', subtitle: '健康資訊', icon: 'book', color: '#2980b9', page: 'health' },
      { title: '聊天室', subtitle: '聯繫家人', icon: 'chatbubble', color: '#8e44ad', page: 'chat' },
      { title: '健康遊戲', subtitle: '寓教於樂', icon: 'game-controller', color: '#27ae60', page: 'game' },
    ];
    content = (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}>
        <View style={styles.root}>
          <Text style={[styles.sectionTitle, { marginTop: 0 }]}>所有服務</Text>
          <View style={[styles.grid, styles.scrollArea]}>
            {services.map((item, idx) => (
              <Pressable
                key={idx}
                style={styles.card}
                onPress={() => setPage(item.page)}
              >
                <View style={[styles.iconCircle, { backgroundColor: item.color }]}> 
                  <Ionicons name={item.icon} size={64} color="#fff" style={{ alignSelf: 'center' }} />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  } else if (page === 'health') content = <HealthEducationScreen goHome={goHome} />;
  else if (page === 'register') content = <RegisterScreen goHome={goHome} />;
  else if (page === 'onlineRegister') content = <OnlineRegisterScreen goHome={goHome} />;
  else if (page === 'medication') content = <MedicationReminderScreen goHome={goHome} />;
  // else if (page === 'appointment') content = <AppointmentReminderScreen goHome={goHome} />;
  else if (page === 'revisitReminder') content = <RevisitReminderScreen goHome={goHome} />;
  else if (page === 'mrNavigation') content = <MRNavigationScreen goHome={goHome} />;
  else if (page === 'chat') content = <ChatScreen goHome={goHome} />;
  else if (page === 'game') content = <GameScreen goHome={goHome} />;
  else if (page === 'emergency') content = <EmergencyCallScreen goHome={goHome} />;
  else content = null;

  const showHeader = !(page === 'register' || page === 'welcome');
  return (
    <View style={{ flex: 1 }}>
      {/* Drawer 遮罩與內容 */}
      <Modal visible={drawerOpen} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setDrawerOpen(false)}>
          <View style={styles.drawerOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.drawerContainer}>
          <View style={styles.drawerMenuList}>
            {menuList.map((item, idx) => (
              <TouchableOpacity
                key={item.page}
                style={[styles.drawerMenuItem, page === item.page && styles.drawerMenuItemActive]}
                onPress={() => {
                  setPage(item.page);
                  setDrawerOpen(false);
                }}
              >
                <Ionicons name={item.icon} size={26} color={page === item.page ? '#3498db' : '#888'} style={{ marginRight: 16 }} />
                <Text style={[styles.drawerMenuText, page === item.page && styles.drawerMenuTextActive]}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      {/* 固定標題列（註冊/歡迎頁不顯示） */}
      {showHeader && (
        <View style={styles.fixedHeader}>
          <View style={styles.headerLeft}>
            <View style={styles.logoCircle}>
              <Image source={require('./assets/center-icon.png')} style={{ width: 32, height: 32 }} />
            </View>
            <Text style={styles.headerTitle}>護你同在</Text>
          </View>
          <TouchableOpacity onPress={() => setDrawerOpen(true)}>
            <Ionicons name="menu" size={32} color="#333" style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
      )}
      {/* 內容區塊 */}
      <View style={{ flex: 1, paddingTop: showHeader ? 84 : 0 }}>
        {content}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.18)',
    zIndex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 260,
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  drawerMenuList: {
    marginTop: 36,
    paddingHorizontal: 8,
  },
  drawerMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 2,
  },
  drawerMenuItemActive: {
    backgroundColor: '#eaf3fb',
  },
  drawerMenuText: {
    fontSize: 18,
    color: '#444',
  },
  drawerMenuTextActive: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  root: {
    flex: 1,
    backgroundColor: '#f7fafd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 2,
  },
  menuIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 20,
    marginTop: 18,
    marginBottom: 8,
    letterSpacing: 2,
  },
  scrollArea: {
    paddingBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 26,
    marginVertical: 12,
    marginHorizontal: 0, // 調整水平間距
    paddingVertical: 44,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
  iconCircle: {
    width: 108, 
    height: 108, 
    borderRadius: 54, // 放大一倍
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24, // 放大一倍
  },
  cardTitle: {
    fontSize: 36, // 放大一倍
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8, // 放大一倍
    letterSpacing: 2, // 放大一倍
  },
  cardSubtitle: {
    fontSize: 28, // 放大一倍
    color: '#888',
    letterSpacing: 2, // 放大一倍
  },
  welcomeContainer: {
    flex: 1,
    backgroundColor: '#f7f5ee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 6,
  },
  welcomeAppTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 5,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  welcomeIconWrap: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  welcomeCenterIcon: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 0,
  },
  welcomeBtnGroup: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  welcomeBtn: {
    width: 260,
    backgroundColor: '#8bbec7',
    borderRadius: 30,
    paddingVertical: 26,
    alignItems: 'center',
    marginVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeBtnText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  welcomeBtn: {
    width: 220,
    backgroundColor: '#8bbec7',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeBtnText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  registerContainer: {
    flex: 1,
    backgroundColor: '#f7f5ee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  registerButton: {
    backgroundColor: '#53b6c3',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 24,
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f3ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 30,
    letterSpacing: 4,
    textAlign: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  menuBtn: {
    width: '40%',
    margin: '5%',
    backgroundColor: '#8bbec7',
    borderRadius: 20,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  menuBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  imageCircleSmall: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  iconSmall: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  btn: {
    width: 360,
    backgroundColor: '#8bbec7',
    borderRadius: 60,
    paddingVertical: 32,
    alignItems: 'center',
    marginVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
