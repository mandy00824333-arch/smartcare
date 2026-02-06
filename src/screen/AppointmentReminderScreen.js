import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import TitleSection from '../components/TitleSection';
import BackButton from '../components/BackButton';


export default function AppointmentReminderScreen({ goHome }) {
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 標題區塊改用共用元件 */}
      <TitleSection iconName="calendar" title="線上掛號" subtitle="輕鬆預約您的門診" />
      {/* 其餘內容可依需求擴充 */}
      <BackButton onPress={goHome} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5ee',
    alignItems: 'center',
    paddingTop: 16,
  },
  // ...existing code...
});
